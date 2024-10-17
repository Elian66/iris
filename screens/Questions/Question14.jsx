import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, PermissionsAndroid, Platform, ScrollView } from 'react-native';
import { Avatar, Button, Div, Text } from 'react-native-magnus';
import { Camera, CameraType } from 'react-native-camera-kit';
import { storage } from '../../firebase';
import { getDatabase, ref as dbRef, push, set, get, update } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

export default function Question10({ navigation }) {
    const [hasPermission, setHasPermission] = useState(false);
    const [planoUsado, setPlanoUsado] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Permissão de Câmera',
                        message: 'O aplicativo precisa de acesso à câmera para tirar fotos',
                        buttonNeutral: 'Pergunte-me depois',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'OK',
                    }
                );
                setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchPlanoUsado = async () => {
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
            const auth = getAuth(app);

            try {
                const email = await AsyncStorage.getItem('username');
                if (!email) {
                    console.log('No email found in AsyncStorage');
                    return;
                }

                const user = auth.currentUser;
                if (user) {
                    const userRef = dbRef(db, `users/${user.uid}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setPlanoUsado(userData.planoUsado || false);
                    } else {
                        console.log('Documento do usuário não encontrado.');
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchPlanoUsado();
    }, []);

    const nextStep = () => {
        navigation.navigate('Finish');
    };

    const takePicture = async () => {
        if (planoUsado) {
            Alert.alert('Plano Utilizado', 'Seu plano já foi utilizado. Por favor, compre um novo plano para continuar.');
            navigation.navigate('Planos');
            return;
        }

        if (cameraRef.current) {
            const { uri } = await cameraRef.current.capture();
            console.log(uri);
            uploadImageToStorage(uri);
        }
    };

    const uploadImageToStorage = async (uri) => {
        const storage = getStorage();
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `images/${filename}`);

        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Download URL: ', downloadURL);
            await AsyncStorage.setItem('image_url', String(downloadURL));
            await addResultToDatabase(downloadURL);

            // Atualiza o campo planoUsado para true após o uso
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getDatabase();
                const userRef = dbRef(db, `users/${user.uid}`);
                await update(userRef, { planoUsado: true });
                
                console.log('planoUsado atualizado para true');
            }

            nextStep();
        } catch (error) {
            console.log('Upload Error: ', error);
            Alert.alert('Falha!', 'Erro ao enviar imagem');
        }
    };

    const addResultToDatabase = async (downloadURL) => {
        try {
            const email = await AsyncStorage.getItem('username');
            const points = await sumPoints();
            const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'UTC' });

            const database = getDatabase();
            const resultsRef = dbRef(database, 'results');
            const newResultRef = push(resultsRef);

            await set(newResultRef, {
                email,
                image: downloadURL,
                points,
                timestamp
            });

            console.log('Result added to database');
        } catch (error) {
            console.log('Database Error: ', error);
            Alert.alert('Falha!', 'Erro ao adicionar resultado ao banco de dados');
        }
    };

    const sumPoints = async () => {
        let points = 0;
        for (let i = 1; i <= 9; i++) {
            const value = await AsyncStorage.getItem(`points_step_${i}`);
            points += Number(value) || 0; // Garante que o valor é tratado como número
        }
        return points;
    };

    if (!hasPermission) {
        return (
            <Div p={20} flex={1} justifyContent='center'>
                <Text fontSize={30}>Solicitando permissão para acessar a câmera...</Text>
            </Div>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Div p={20} flex={1} justifyContent='center'>
                <Text fontSize={30}>Aproxime os olhos bem abertos olhando para a câmera frontal e confirme!</Text>
                <Camera
                    ref={cameraRef}
                    cameraType={CameraType.Front} // front/back(default)
                    flashMode='auto'
                    style={{
                        width: "100%",
                        height: "70%"
                    }}
                />
                <Div>
                    <Button onPress={takePicture} block mt={30}>Confirmar</Button>
                </Div>
            </Div>
        </ScrollView>
    );
}
