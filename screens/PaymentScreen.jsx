import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import usePaymentStatus from '../hooks/usePaymentStatus'; // Importe corretamente o hook usePaymentStatus
import { app, db, auth } from '../firebase'; // Importar instâncias do firebase configurado

const PaymentScreen = ({ route }) => {
  const { url, planName, id } = route.params;
  const [loading, setLoading] = useState(true);
  const { paymentStatus } = usePaymentStatus(id, planName);
  const navigation = useNavigation();

  const handleWebViewMessage = async (event) => {
    const message = event.nativeEvent.data;
    console.log(`componente => ${message}`);
    if (paymentStatus.message === 'pending') {
      Alert.alert('Pagamento', 'Pagamento realizado com sucesso!');
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const user = auth.currentUser;
          if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            await update(userRef, { plano: planName, planoUsado: false });
            
            console.log('Plano cadastrado com sucesso!');
          } else {
            console.log('Usuário não autenticado.');
          }
        } else {
          console.log('Username não encontrado no AsyncStorage.');
        }
      } catch (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
      }

      setTimeout(() => {
        navigation.navigate('Home');
      }, 4000);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      )}
      <WebView
        source={{ uri: url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onMessage={handleWebViewMessage}
        injectedJavaScript={`
          function notifySuccess() {
            window.ReactNativeWebView.postMessage('payment_success');
          }

          document.addEventListener('payment_success', notifySuccess);
        `}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'    
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default PaymentScreen;
