import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Div, Text, Input } from 'react-native-magnus';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function RecoverScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu endereço de e-mail.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'E-mail Enviado',
        'Um e-mail de recuperação de senha foi enviado para o endereço fornecido.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação. Verifique o endereço e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div flex={1} justifyContent="center" alignItems="center" p={20}>
      <Text fontSize={24} fontWeight="bold" mb={20}>Recuperar Senha</Text>
      <Input
        placeholder="Informe o e-mail"
        p={10}
        mb={20}
        w="100%"
        focusBorderColor="blue700"
        onChangeText={setEmail}
        value={email}
      />
      <Button
        w="100%"
        onPress={handleResetPassword}
        loading={loading}
      >
        Enviar E-mail de Recuperação
      </Button>
    </Div>
  );
}