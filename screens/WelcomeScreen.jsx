import { Alert, SafeAreaView, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import { useRoute } from '@react-navigation/native'
import image from '../assets/images/logo.jpg'
export default function WelcomeScreen({ navigation }) {

    const redirectLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <Div flex={1}>
            <Div flex={1} justifyContent='center' alignItems='center'>
                <Div flex={2} justifyContent='center' alignItems='center'>
                <Avatar
                    shadow={1}
                    size={200}
                    source={image}
                />
                <Text fontSize={30} fontWeight="bold" color="#3C83B9" mt={10}>Irizame</Text> 
            </Div>
                <Div flex={1} justifyContent='center' alignItems='center'>
                    <Text mb={10} fontSize={30}>Bem vindo </Text>
                    <Button
                        alignSelf='center'
                        disabled={false}
                        onPress={redirectLogin}
                  
                    >
                        Começar
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}