import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const CardPaymentScreen = ({ route }) => {
  const { url, planName } = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDDZ_Cy_kh29l-2kPXQOd2z1VumQj5sKjw",
      authDomain: "irizame-83890.firebaseapp.com",
      databaseURL: "https://irizame-83890-default-rtdb.firebaseio.com",
      projectId: "irizame-83890",
      storageBucket: "irizame-83890.appspot.com",
      messagingSenderId: "653377111210",
      appId: "1:653377111210:web:35534c9fd2fc5104a93cd3",
      measurementId: "G-1PJ7WMD7YC"
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const auth = getAuth(app);
  }, []);

  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;
    console.log("link: " + url);
    if (url.includes('success')) {
      Alert.alert('Pagamento', 'Pagamento realizado com sucesso!');
      try {
        const username = await AsyncStorage.getItem('username');
        if (username !== null) {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            const db = getDatabase();
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
      }, 4000); // Espera 4 segundos antes de navegar para Home
    } else if (url.includes('failure')) {
      Alert.alert('Pagamento', 'Falha no pagamento.');
      navigation.navigate('Planos');
    } else if (url.includes('pending')) {
      Alert.alert('Pagamento', 'Pagamento pendente.');
      navigation.navigate('Planos');
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
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
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

export default CardPaymentScreen;
