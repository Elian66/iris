import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/drinking.webp'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Nada, bebo café e chá",
        points: 0,
    },
    {
        label: "Cerca de 2 copos",
        points: 0,
    },
    {
        label: "De 2 a 6 Copos",
        points: 5,
    },
    {
        label: "Muita. Provavelmente mais de 6 copos",
        points: 10,
    }
];

export default function Question5({ navigation }) {

    const nextStep = async (option) => {
        await AsyncStorage.setItem('points_step_5', String(option.points));
        navigation.navigate('Question6');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Quanta água você bebe diariamente?</Text>
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