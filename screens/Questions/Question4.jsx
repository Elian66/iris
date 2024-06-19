import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/walking.webp'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Menos que 20 minutos",
        points: 0,
    },
    {
        label: "De 20 a 60 minutos",
        points: 3,
    },
    {
        label: "Mais de 60 minutos",
        points: 5,
    }
];

export default function Question4({ navigation }) {
    const nextStep = async (option) => {
        await AsyncStorage.setItem('points_step_4', String(option.points));
        navigation.navigate('Question5');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Por quanto tempo você costuma caminhar em um dia comum?</Text>
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