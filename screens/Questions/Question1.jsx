import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/running.jpg'
import { QuestionContext } from '../../contexts/QuestionsContext';
import { ApplicationContext } from '../../contexts/ApplicationContext';
import { useIsFocused } from "@react-navigation/native";

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

export default function Question1({ navigation }) {

    const nextStep = async (option) => {
        await AsyncStorage.setItem('points_step_1', String(option.points));
        navigation.navigate('Question2');
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Você pratica atividades físicas regularmente?</Text>
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