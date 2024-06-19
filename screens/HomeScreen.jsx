import { Image, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Div, Text, Icon, Drawer, Avatar } from 'react-native-magnus';
import useHttp from '../hooks/use-http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useIsFocused, CommonActions } from '@react-navigation/native';
import logo from '../assets/images/logo.jpg';
import { getAuth } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [profileDetails, setProfileDetails] = useState({});
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  const [temPlano, setTemPlano] = useState(false); // Usando useState para temPlano
  const drawerRef = useRef();

  const redirectToStep1 = () => {
    console.log('temPlano: ' + temPlano)
    if (temPlano) {
      navigation.navigate('Question1');
    } else {
      navigation.navigate('Planos');
    }
  };

  const openDrawer = () => {
    drawerRef.current.open();
  };

  const redirectToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {

      const firebaseConfig = {
        apiKey: 'AIzaSyC13O-bECEzG4-550uJXbzs2AM1SXna2I4',
        authDomain: 'irizame-acfc9.firebaseapp.com',
        databaseURL: 'https://irizame-acfc9-default-rtdb.firebaseio.com',
        projectId: 'irizame-acfc9',
        storageBucket: 'irizame-acfc9.appspot.com',
        messagingSenderId: '272959972303',
        appId: '1:272959972303:web:94dd4278552ec1f3cea8ba',
      };
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);

      try {
        const email = await AsyncStorage.getItem('username');
        console.log('usr: ' + email) // Get email from AsyncStorage
        if (!email) {
          console.log('No email found in AsyncStorage');
          return; // Handle case where no email found in AsyncStorage
        }
        setAuthenticatedEmail(email); // Set authenticatedEmail state

        console.log('Fetching results for:', authenticatedEmail);
        const auth = getAuth(); // Obter a autenticação
        const user = auth.currentUser; // Usuário atualmente autenticado
          if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            console.log(userRef)
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userPlan = userData.plano; 
                    console.log('Plano do usuário:', userPlan);
                    if (userPlan != null) {
                      setTemPlano(true); // Atualizar o estado de temPlano
                      console.log('foi')
                    }
                } else {
                    console.log('Documento do usuário não encontrado.');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
          }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const navigateTo = (screen) => {
    drawerRef.current.close();
    navigation.navigate(screen);
  };

  return (
    <Div flex={1} p={10} style={{ backgroundColor: "white" }}>
    <Drawer ref={drawerRef}>
    <Image source={require('../assets/images/background.jpg')} style={{ width: "100%", height: 80 }} />
    <Avatar
           borderColor='gray200'
           shadow={1}
           size={80}
           mt={-50}
           source={logo}
         />
        <Text fontSize='xl' mt={-20} fontWeight='bold' alignSelf='center' padding={16}>
          Olá, {authenticatedEmail || profileDetails.email || "Usuário"}
        </Text>
        <Text fontSize='md' ml={30} mt={-0} alignSelf='center'>
          {profileDetails.email}
        </Text>
        <Div flex={1} justifyContent='flex-end' alignItems='center'>
          <Button bg='red700' mb={20} onPress={redirectToLogin} alignSelf='center' mt={20}>
            Deslogar
          </Button>
        </Div>
      </Drawer>
      <Div justifyContent='center' alignItems='flex-start'>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name='bars' fontFamily="FontAwesome" fontSize='6xl' color='gray800' />
        </TouchableOpacity>
      </Div>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Div shadow="sm" bg="white" p={20} rounded="md" m={20}>
          <Text fontSize='lg' textAlign='center' mb={10} color="gray700">
            A iridologia (também conhecida como iridodiagnose ou irisdiagnose) é uma prática pseudocientífica de medicina alternativa cujos proponentes afirmam que os padrões, cores e outras características da íris podem ser examinados para determinar informações sobre a saúde sistêmica do paciente. Os praticantes apresentam suas observações em mapas da íris, que a dividem em zonas que correspondem a partes específicas do corpo humano.
          </Text>
          <Text fontSize='lg' textAlign='center' color="gray700">
            Iridologistas veem os olhos como "janelas" sobre o estado de saúde do corpo. Eles afirmam que podem utilizar os mapas para distinguir entre os sistemas e órgãos saudáveis do corpo daqueles que estão hiperativos, inflamados ou estressados. Iridologistas reivindicam que esta informação demonstra a suscetibilidade do paciente a determinadas doenças, reflete problemas anteriores ou prevê futuros problemas de saúde.
          </Text>
        </Div>
        <Button onPress={redirectToStep1} alignSelf='center'>
          Iniciar questionário
        </Button>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => navigateTo('Home')} style={{ alignItems: 'center' }}>
          <Icon name='home' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Artigos')} style={{ alignItems: 'center' }}>
          <Icon name='book' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Artigos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Resultados')} style={{ alignItems: 'center' }}>
          <Icon name='list' fontFamily="FontAwesome" fontSize='xl' color='gray800' />
          <Text>Resultados</Text>
        </TouchableOpacity>
      </View>
    </Div>
  );
}