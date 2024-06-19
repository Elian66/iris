import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/depression.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Sim",
        points: 5,
    },
    {
        label: "Não",
        points: 0,
    }
];

export default function Question10({ navigation }) {

    const nextStep = async (option) => {
        await AsyncStorage.setItem('points_step_10', String(option.points));
        navigation.navigate('Question11');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Você tem depressão?</Text>
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