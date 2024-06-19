import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Div, Text, Input } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import conf from '../conf.json'
import logo from '../assets/images/logo.jpg'
import axios from 'axios';
import useHttp from '../hooks/use-http';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { serverTimestamp, getDatabase, ref, set, get } from "firebase/database"

export default function LoginScreen({ navigation }) {
  const { post } = useHttp();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('user: ' + JSON.stringify(user));
      console.log('username: ' + username);
      await AsyncStorage.setItem('username', username);

      const userRef = ref(db, `users/${user.uid}`);
      console.log(userRef)
      get(userRef)
      .then((snapshot) => {
          if (snapshot.exists()) {
              const userData = snapshot.val();
              const userPlan = userData.plano; 
              console.log('Plano do usuário login:', userPlan);
              if (userPlan != null) {
                navigation.navigate('Home');
              } else {
                navigation.navigate('Planos');
              }
          } else {
              console.log('Documento do usuário não encontrado.');
          }
      })
      .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
      });
      //saveLoginData(user);
      setLoading(false);
    } catch (error) {
      if(error.code === 'auth/invalid-credencial'){
        Alert.alert('Erro de Login', 'Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.');
      }else{
        console.error('Error logging in:', error);
        Alert.alert("Login Error", error.message);
        setLoading(false);
      }
      
    }
  };

  const redirectToRegister = () => {
    navigation.navigate('Register');
  };

  const saveLoginData = async (user) => {
    const userData = {
      email: user.email,
      lastLogin: serverTimestamp()
    };

    const db = getDatabase();
    try {
      await set(ref(db, 'users/' + user.uid), {
        email: user.email,
        createdAt: serverTimestamp()
      });
      navigation.navigate('Planos');
    } catch (error) {
      console.log('Error saving login data:', error);
    }
  };

  return (
    <Div flex={1}>
      <Div flex={1} justifyContent='center' alignItems='center'>
        <Div flex={2} justifyContent='center' alignItems='center'>
          <Avatar
            shadow={1}
            size={200}
            source={logo}
          />
          <Text fontSize={30} fontWeight="bold" color="#3C83B9" mt={10}>Irizame</Text> 
        </Div>
        <Div flex={2} justifyContent='flex-start' alignItems='center' p={10}>
          <Input
            placeholder='Endereço de e-mail'
            p={10}
            focusBorderColor='blue700'
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Input
            placeholder='Senha'
            p={10}
            mt={10}
            focusBorderColor='blue700'
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Button
            alignSelf='center'
            disabled={!username || !password}
            onPress={handleLogin}
            mt={10}
            loading={loading}
          >
            Entrar
          </Button>

          <TouchableOpacity onPress={redirectToRegister} style={{ marginTop: 10 }}>
            <Text> Ainda não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </Div>
      </Div>
    </Div>
  );
}
