import React, {useState, useRef} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  Div,
  Text,
  Input,
  Icon,
  Snackbar,
} from 'react-native-magnus';
import logo from '../assets/images/logo.jpg';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set, serverTimestamp} from 'firebase/database';
import {auth} from '../firebase';
import { isValidCPF } from '../util/util';

const errorMessages = {
  'auth/email-already-in-use':
    'O e-mail fornecido já está em uso. Por favor, utilize outro e-mail.',
  'auth/invalid-email':
    'O e-mail fornecido é inválido. Por favor, verifique e tente novamente.',
  'auth/operation-not-allowed':
    'O cadastro de usuários está desabilitado no momento.',
  'auth/weak-password':
    'A senha fornecida é muito fraca. Por favor, escolha uma senha mais forte.',
  default: 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.',
};

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const snackbarRef = useRef(null);

  const getFriendlyErrorMessage = errorCode => {
    return errorMessages[errorCode] || errorMessages['default'];
  };

  const register = async () => {
    if (isValidCPF(cpf)) {
      console.log('CPF é válido.');
    } else {
      Alert.alert('Digite um CPF válido');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User registered:', user);

      await saveUserData(user);
      snackbarRef.current.show('Cadastro realizado com sucesso!', {
        duration: 2000,
        suffix: (
          <Icon
            name="checkcircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        ),
      });
      setTimeout(() => {
        navigation.navigate('Terms');
      }, 2000);
    } catch (error) {
      const friendlyErrorMessage = getFriendlyErrorMessage(error.code);
      setError(friendlyErrorMessage);
      snackbarRef.current.show(friendlyErrorMessage, {
        duration: 3000,
        bg: 'red700',
        color: 'white',
        suffix: (
          <Icon
            name="closecircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        ),
      });
      console.log('error:', error);
    }
  };

  const saveUserData = async user => {
    const db = getDatabase();
    await set(ref(db, 'users/' + user.uid), {
      email: user.email,
      cpf: cpf,
      createdAt: serverTimestamp(),
      username: username,
    });
  };

  const redirectToLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Div flex={1}>
        <Snackbar ref={snackbarRef} bg="green700" color="white" />
        <Div flex={1} justifyContent="center" alignItems="center">
          <Div flex={2} justifyContent="center" alignItems="center">
            <Avatar shadow={1} size={200} source={logo} />
            <Text fontSize={30} fontWeight="bold" color="#3C83B9" mt={10}>
              Irizame
            </Text>
          </Div>
          <Div flex={2} justifyContent="flex-start" alignItems="center" p={10}>
            <Input
              placeholder="Nome"
              p={10}
              focusBorderColor="blue700"
              value={username}
              onChangeText={setUsername}
            />

            <Input
              type={'cpf'}
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maxLength={11}
              placeholder="CPF"
              p={10}
              mt={10}
              focusBorderColor="blue700"
            />
            <Input
              placeholder="E-mail"
              p={10}
              mt={10}
              focusBorderColor="blue700"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              p={10}
              mt={10}
              focusBorderColor="blue700"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              alignSelf="center"
              disabled={false}
              onPress={register}
              mt={10}>
              Cadastrar-se
            </Button>
            <TouchableOpacity onPress={redirectToLogin} style={{marginTop: 10}}>
              <Text>Já possui uma conta? Login</Text>
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>
    </ScrollView>
  );
}
