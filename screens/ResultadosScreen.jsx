import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Button, Div, Text, Icon, Drawer, Avatar } from 'react-native-magnus';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultadosScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);

  useEffect(() => {
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

  // Função que simula a navegação
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const renderResult = ({ item }) => (
    <View style={{ padding: 8 }}>
      <Text>{item.email}</Text>
      <Text>Pontos: {item.points}</Text>
      <Text>Feito em: {item.timestamp}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Div flex={1} p={10} style={{ backgroundColor: "white" }}>
      <Div flex={1} justifyContent='center' alignItems='center'>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
          {authenticatedEmail}
        </Text>
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={item => item.email}
        />
      </Div>
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
};

export default ResultadosScreen;
