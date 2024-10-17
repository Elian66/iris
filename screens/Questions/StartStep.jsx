import React, { useEffect, useState, useRef } from 'react';
import { Image, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Icon, Drawer, Avatar, Div } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useIsFocused, CommonActions } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

export default function StartStep({ navigation }) {

    const isFocused = useIsFocused();
    const [profileDetails, setProfileDetails] = useState({});
    const [authenticatedEmail, setAuthenticatedEmail] = useState(null);
    const [temPlano, setTemPlano] = useState(false);
    const [planoUsado, setPlanoUsado] = useState(false); // Novo estado para verificar se o plano foi usado
    const drawerRef = useRef();

    const redirectToStep1 = () => {
        if (temPlano && !planoUsado) {
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

    useEffect( () => {
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
                                console.log(userData);
                                console.log('userData.plano: ' + userData.plano)
                               
                                if (userPlan != null) {
                                    setTemPlano(true);
                                    console.log('usou plano: ' + userData.planoUsado)
                                    setPlanoUsado(userData.planoUsado || false); // Verifica se o plano já foi usado
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./../../assets/images/cardImage.jpg')} style={styles.image} />
            <Div style={styles.card}>
                <Text fontSize='lg' textAlign='center' mb={10} color="gray700">
                    Você vai responder 13 perguntas, após as respostas deve procurar um local iluminado para tirar a foto dos olhos.
                </Text>
                <Text fontSize='lg' textAlign='center' mb={10} color="gray700">
                    Aproximar a câmera frontal do celular bem próximo dos olhos.
                </Text>
                <Text fontSize='lg' textAlign='center' color="gray700">
                    Manter os olhos bem abertos olhando para a câmera frontal do celular.
                </Text>
                <View style={{height: 32}}></View>
                <Button onPress={redirectToStep1} alignSelf='center'>
                    Iniciar questionário
                </Button>
            </Div>
        </ScrollView>
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
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 20,
        width: '90%',
        alignItems: 'center',
    },
});
