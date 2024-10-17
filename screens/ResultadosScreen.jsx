import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Button, Div, Text } from 'react-native-magnus';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBack from './HeaderBack';

const ResultadosScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);

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

    const fetchResults = async () => {
      try {
        const email = await AsyncStorage.getItem('username'); // Get email from AsyncStorage
        if (!email) {
          console.log("No email found in AsyncStorage");
          setLoading(false);
          return; // Handle case where no email found in AsyncStorage
        }
        setAuthenticatedEmail(email); // Set authenticatedEmail state

        console.log('Fetching results for:', email);
        const resultsRef = query(ref(db, '/results'), orderByChild('email'), equalTo(email));
        const snapshot = await get(resultsRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          console.log("Dados recebidos: ", data);
          setResults(data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const renderResult = ({ item }) => {
    const handleViewResult = () => {
      const points = item.points;
      let driveLink;

      if (points >= 1 && points <= 10) {
        driveLink = 'https://drive.google.com/file/d/1xxJoqk4kE4VEXJPcuoAvF_eWFSW4KW9f/view';
      } else if (points >= 11 && points <= 20) {
        driveLink = 'https://drive.google.com/file/d/1Cav-uNYXpG3ABacb9q_4O-85YGxuJbzi/view';
      } else if (points >= 21 && points <= 30) {
        driveLink = 'https://drive.google.com/file/d/1LeE3QRfdwL7-DX38j6Ii215Wvu_M-MUJ/view';
      } else if (points >= 31 && points <= 40) {
        driveLink = 'https://drive.google.com/file/d/1vSkDq0l75OdR3Admp_LTrhRDZVE4zfwH/view';
      } else if (points >= 41 && points <= 50) {
        driveLink = 'https://drive.google.com/file/d/1xXCfBGDRhGvyJ4-NfFufSbPQIi-RY4fG/view';
      } else if (points >= 51 && points <= 60) {
        driveLink = 'https://drive.google.com/file/d/1hseA1gT1KQLCA7Nz4uwOh86uzxv8eJ36/view';
      } else if (points >= 61 && points <= 70) {
        driveLink = 'https://drive.google.com/file/d/12kCJpZx4jCqpxHDJwnUlT_H5KNllinif/view';
      } else if (points >= 71 && points <= 80) {
        driveLink = 'https://drive.google.com/file/d/1YKweApmaH3oPizTTQexuFheDHjmbqNNC/view';
      } else if (points >= 81 && points <= 90) {
        driveLink = 'https://drive.google.com/file/d/18UU8-JCf74rwJOHm1DXzjAXnUtjIxUdB/view';
      } else if (points >= 91 && points <= 100) {
        driveLink = 'https://drive.google.com/file/d/1ICNO2ELR8T2IlDAOtA7Q0G8gtIyoJLF6/view';
      } else if (points >= 101 && points <= 110) {
        driveLink = 'https://drive.google.com/file/d/1CqN4hFkNJQczyxWSyWs3OEq78rHic6py/view';
      } else if (points >= 111 && points <= 120) {
        driveLink = 'https://drive.google.com/file/d/1bwG2Lo8IKG1i0WSWb1-Jk_jhD-hSJKx9/view';
      } else {
        driveLink = 'https://drive.google.com/file/d/1L4yOZ69WJjruc0DUlPwN_lyuTxm175Gp/view';
      }

      if (driveLink) {
        navigation.navigate('WebViewScreen', { url: driveLink });
      } else {
        console.log('No valid link for points:', points);
      }
    };

    return (
      <View style={{ padding: 8 }}>
        <Text>{item.email}</Text>
        <Text>Pontos: {item.points}</Text>
        <Text>Feito em: {item.timestamp}</Text>
        <Button onPress={handleViewResult} mt={10}>Ver Resultado</Button>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Div flex={1} p={10} style={{ backgroundColor: "white", padding: 24 }}>
      <Div flex={1} justifyContent='center' >
        <HeaderBack navigation={navigation}>Meus Resultados</HeaderBack>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
          {authenticatedEmail}
        </Text>
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={item => item.email}
        />
      </Div>
    </Div>
  );
};

export default ResultadosScreen;
