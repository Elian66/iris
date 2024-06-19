import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import image from '../../assets/images/working.webp'
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        label: "Bastante inativo",
        points: 0,
    },
    {
        label: "Trabalho físico/Muito ativo",
        points: 5,
    },
    {
        label: "Um pouco dos dois",
        points: 3,
    }
];

export default function Question1({ navigation }) {
    const nextStep = async (option) => {
        await AsyncStorage.setItem('points_step_2', String(option.points));
        navigation.navigate('Question3');
    };

    const getPoints = async () => {
        const currentPoints = await AsyncStorage.getItem('points_history');
        console.log(currentPoints);
        return currentPoints;
    };

    React.useEffect(() => {
        getPoints();
    }, []);

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Avatar 
                alignSelf='center'
                shadow={1}
                size={200}
                source={image}
            />
            <Text fontSize={30}>Qual seu nível de atividade no trabalho??</Text>

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