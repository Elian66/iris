import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import usePaymentStatus from '../hooks/usePaymentStatus'; // Importe corretamente o hook usePaymentStatus

const PaymentScreen = ({ route }) => {
  const { url, planName, id } = route.params; // Não está utilizando id e type, mas se precisar, adicione-os aqui
  const [loading, setLoading] = useState(true);
  const { paymentStatus } = usePaymentStatus(id, planName); // Obtenha a função startPolling do hook usePaymentStatus
  const navigation = useNavigation();

  useEffect(() => {
    // Inicialize o Firebase aqui apenas uma vez
    const firebaseConfig = {
      apiKey: "AIzaSyC13O-bECEzG4-550uJXbzs2AM1SXna2I4",
      authDomain: "irizame-acfc9.firebaseapp.com",
      databaseURL: "https://irizame-acfc9-default-rtdb.firebaseio.com",
      projectId: "irizame-acfc9",
      storageBucket: "irizame-acfc9.appspot.com",
      messagingSenderId: "272959972303",
      appId: "1:272959972303:web:94dd4278552ec1f3cea8ba"
    };
    const app = initializeApp(firebaseConfig);
  }, []);

  const handleWebViewMessage = async (event) => {
    const message = event.nativeEvent.data;
    console(`componente => ${message}`)
    if (message === 'payment_success') {
      Alert.alert('Pagamento', 'Pagamento realizado com sucesso!');
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const auth = getAuth(); // Obter a autenticação
          const user = auth.currentUser; // Usuário atualmente autenticado
          if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            await update(userRef, { plano: planName });
            console.log('Plano cadastrado com sucesso!');
          } else {
            console.log('Usuário não autenticado.');
          }
        } else {
          console.log('Username não encontrado no AsyncStorage.');
        }
      } catch (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
        // Implementar um feedback para o usuário sobre o erro
      }

      setTimeout(() => {
        navigation.navigate('Home');
      }, 4000); // Espera 4 segundos antes de navegar para Home
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
        onMessage={handleWebViewMessage} // Captura mensagens da WebView
        injectedJavaScript={`
          // Exemplo de script que envia uma mensagem de sucesso para o aplicativo
          function notifySuccess() {
            window.ReactNativeWebView.postMessage('payment_success');
          }
          
          // Exemplo de escuta de um evento na página de sucesso (simulado)
          document.addEventListener('payment_success', notifySuccess);
        `}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default PaymentScreen
