import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/pain.jpg'
import { Camera, CameraType } from 'react-native-camera-kit';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Question10({ navigation }) {

    const nextStep = () => {
        navigation.navigate('Finish');
    };

    const takePicture = async () => {
        const { uri } = await this.camera.capture();
        console.log(uri);
        uploadImageToStorage(uri);
    }

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
            nextStep();
        } catch (error) {
            console.log('Upload Error: ', error);
            Alert.alert('Falha!', 'Erro ao enviar imagem');
        }
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Text fontSize={30}>Posicione a câmera em sua íris e confirme</Text>
            <Camera
                ref={(ref) => (this.camera = ref)}
                cameraType={CameraType.Front} // front/back(default)
                flashMode='auto'
                style={{
                    width: "100%",
                    height: "70%"
                }}
            />
         
            <Div >
                <Button onPress={takePicture} block mt={30}>Confirmar</Button>
            </Div>
        </Div>
    )
}