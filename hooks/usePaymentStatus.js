import { useState, useEffect } from 'react';
import { ACCESS_TOKEN } from "../config.json";
import {  Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";


const usePaymentStatus = (paymentId, planName) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true); // Estado para controlar se o polling deve continuar

  const navigation = useNavigation();


  useEffect(() => {
    let intervalId;

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

    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });
        const data = await response.json();
        setPaymentStatus(data.status);
        console.log(data.status)
        if (data.status === 'approved') {
          setIsActive(false);
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
          }, 1000);
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error);
      } finally {
        setLoading(false);
      }
    };

    const startPolling = () => {
      setLoading(true);
      fetchPaymentStatus();
      intervalId = setInterval(fetchPaymentStatus, 1000);
    };

    if (isActive) {
      startPolling();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [paymentId, isActive]);

  return { paymentStatus, loading };
};

export default usePaymentStatus;
