import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/sleeping.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Pouco descanso (Menos de 5 horas)",
        points: 5,
    },
    {
        label: "Durmo pouco (5-6 horas)",
        points: 3,
    },
    {
        label: "Um bom descanso (7-8 horas)",
        points: 1,
    },
    {
        label: "Sou um especialista em dormir (mais de 8 horas)",
        points: 0,
    }
];


export default function Question6({ navigation }) {

    const nextStep = async () => {
        await AsyncStorage.setItem('points_step_6', String(options[0].points));
        navigation.navigate('Question7');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Sinceramente, como é uma noite normal para você?</Text>
            <Div >
                {options.map((option, index) => (
                    <Button
                        key={index}
                        block
                        mt={10}
                        onPress={() => nextStep(option)}
                    >
                        {option.label}
                    </Button>
                ))}
            </Div>
        </Div>
    )
}