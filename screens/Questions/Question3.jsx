import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/breathless.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Fico tão sem fôlego que não consigo falar",
        points: 5,
    },
    {
        label: "Estou um pouco sem ar, mas consigo falar",
        points: 3,
    },
    {
        label: "Fico normal deepois de um lance de escadas",
        points: 1,
    },
    {
        label: "Eu poderia subir fácil alguns lances de escadas",
        points: 0,
    }
];

export default function Question3({ navigation }) {

    const nextStep = async (option) => {
        console.log(option)
        await AsyncStorage.setItem('points_step_3', String(option.points));
        navigation.navigate('Question4');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Você fica sem fôlego após subir um lance de escada?</Text>
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