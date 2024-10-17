import React, { useEffect, useState, useRef } from 'react';
import { Image, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Icon, Drawer, Avatar, Div } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useIsFocused, CommonActions } from '@react-navigation/native';
import logo from '../assets/images/logo.jpg';
import { getAuth } from 'firebase/auth';
import Header from './Header'
import DashInfo from './DashInfo';
import fetchPaymentStatus from '../hooks/fechPaymentsStatus';


export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [profileDetails, setProfileDetails] = useState({});
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
  const [temPlano, setTemPlano] = useState(false);
  const drawerRef = useRef();

  const redirectToStep1 = () => {
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

      try {

        const auth = getAuth();
        const user = auth.currentUser;
        setAuthenticatedEmail(user.email);
        if (user) {
          const userRef = ref(db, `users/${user.uid}`);
          get(userRef)
            .then(async (snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.val();
                const userPlan = userData.plano;
                console.log(`${userData.paymentPeding}`)

                if (userData.paymentPeding == true) {
                  await fetchPaymentStatus(
                    userData.lastPaymentId,
                    userData.plano,
                  );
                }

                if (userPlan != null) {
                  setTemPlano(true);
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
    <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <Avatar
            shadow={1}
            size={200}
            source={logo}
          />
          <Header>Seja bem-vindo</Header>
          <DashInfo>{authenticatedEmail} </DashInfo>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Artigos')}
          style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../assets/images/01.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>O que é Iridologia</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate('Start')}
          style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../assets/images/02.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>Realizar Exame</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate('Resultados')}
          style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../assets/images/03.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>Meus Resultados</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={redirectToLogin}
          style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../assets/images/04.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>Sair</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 80,
    width: 320,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 16,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#000',
    marginBottom: 4,
    marginRight: 20,
    fontSize: 16
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white'
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  }
});
