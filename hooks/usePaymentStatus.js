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

    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });
        const data = await response.json();
        console.log(data.status)
        setPaymentStatus(data.status);

        try {
          const auth = getAuth(); // Obter a autenticação
          const user = auth.currentUser; // Usuário atualmente autenticado
          if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            console.log(userRef)
            await update(userRef, { plano: planName, planoUsado: true, lastPaymentId: paymentId, paymentPeding : true });
            console.log('Plano cadastrado com sucesso!');
          } else {
            console.log('Usuário não autenticado.');
          }
        
      } catch (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
        // Implementar um feedback para o usuário sobre o erro
      }

        if (data.status === 'approved') {
          setIsActive(false);
          try {
              const auth = getAuth(); // Obter a autenticação
              const user = auth.currentUser; // Usuário atualmente autenticado
              if (user) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                console.log(userRef)
                await update(userRef, { plano: planName, planoUsado: false, lastPaymentId: paymentId, paymentPeding : false });
                console.log('Plano cadastrado com sucesso!');
              } else {
                console.log('Usuário não autenticado.');
              }
            
          } catch (error) {
            console.error('Erro ao atualizar plano do usuário:', error);
            // Implementar um feedback para o usuário sobre o erro
          }


          setTimeout(() => {
            Alert.alert('Pagamento Realizado com sucesso')
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
