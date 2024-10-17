import React, { useEffect, useState } from 'react';
import { Button, Div, Text, Skeleton } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, Linking, Platform } from 'react-native';

export default function Finish({ navigation }) {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    const driveLinks = {
        1: 'https://drive.google.com/file/d/1xxJoqk4kE4VEXJPcuoAvF_eWFSW4KW9f/view',
        2: 'https://drive.google.com/file/d/1Cav-uNYXpG3ABacb9q_4O-85YGxuJbzi/view',
        3: 'https://drive.google.com/file/d/1LeE3QRfdwL7-DX38j6Ii215Wvu_M-MUJ/view',
        4: 'https://drive.google.com/file/d/1vSkDq0l75OdR3Admp_LTrhRDZVE4zfwH/view',
        5: 'https://drive.google.com/file/d/1xXCfBGDRhGvyJ4-NfFufSbPQIi-RY4fG/view',
        6: 'https://drive.google.com/file/d/1hseA1gT1KQLCA7Nz4uwOh86uzxv8eJ36/view',
        7: 'https://drive.google.com/file/d/12kCJpZx4jCqpxHDJwnUlT_H5KNllinif/view',
        8: 'https://drive.google.com/file/d/1YKweApmaH3oPizTTQexuFheDHjmbqNNC/view',
        9: 'https://drive.google.com/file/d/18UU8-JCf74rwJOHm1DXzjAXnUtjIxUdB/view',
        10:'https://drive.google.com/file/d/1ICNO2ELR8T2IlDAOtA7Q0G8gtIyoJLF6/view',
        11:'https://drive.google.com/file/d/1CqN4hFkNJQczyxWSyWs3OEq78rHic6py/view',
        12:'https://drive.google.com/file/d/1bwG2Lo8IKG1i0WSWb1-Jk_jhD-hSJKx9/view',
        13:'https://drive.google.com/file/d/1L4yOZ69WJjruc0DUlPwN_lyuTxm175Gp/view',
    };

    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        setDateTime({ date: formattedDate, time: formattedTime });
    };

    const nextStep = () => {
        navigation.navigate('Home'); 
    };

    const sumPoints = async () => {
        let points = 0;
        for (let i = 1; i <= 9; i++) {
            const value = await AsyncStorage.getItem(`points_step_${i}`);
            points += Number(value) || 0;
        }
        return points;
    };

    useEffect(() => {
        const fetchPoints = async () => {
            getCurrentDateTime();
            const points = await sumPoints();
            setPoints(points);
            setLoading(false);
        };

        fetchPoints();
    }, []);

    const getDriveLink = (points) => {
        if (points >= 1 && points <= 10) {
            return driveLinks[1];
        } else if (points >= 11 && points <= 20) {
            return driveLinks[2];
        } else if (points >= 21 && points <= 30) {
            return driveLinks[3];
        } else if (points >= 31 && points <= 40) {
            return driveLinks[4];
        } else if (points >= 41 && points <= 50) {
            return driveLinks[5];
        } else if (points >= 51 && points <= 60) {
            return driveLinks[6];
        } else if (points >= 61 && points <= 70) {
            return driveLinks[7];
        } else if (points >= 71 && points <= 80) {
            return driveLinks[8];
        } else if (points >= 81 && points <= 90) {
            return driveLinks[9];
        } else if (points >= 91 && points <= 100) {
            return driveLinks[10];
        } else if (points >= 101 && points <= 110) {
            return driveLinks[11];
        } else if (points >= 111 && points <= 120) {
            return driveLinks[12];
        } else {
            return driveLinks[13];
        }
    };

    if (loading) {
        return (
            <Div p={20} flex={1} justifyContent='center'>
                <Div flexDir="row" mt="md">
                    <Skeleton.Circle h={40} w={40} />
                    <Div ml="md" flex={1}>
                        <Skeleton.Box mt="sm" />
                        <Skeleton.Box mt="sm" w="80%" />
                        <Skeleton.Box mt="sm" />
                    </Div>
                </Div>
                <Div flexDir="row" mt="md">
                    <Skeleton.Circle h={20} w={20} rounded="lg" />
                    <Skeleton.Circle h={20} w={20} rounded="lg" ml="md" />
                    <Div alignItems="flex-end" flex={1}>
                        <Skeleton.Box h={20} w={100}></Skeleton.Box>
                    </Div>
                </Div>
            </Div>
        );
    }

    const driveLink = getDriveLink(points);

    const handleOpenPDF = () => {
        Linking.openURL(driveLink);
    };

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Text fontSize={20} textAlign='center'>{points} pontos</Text>
            {driveLink ? (
                <Div>
                    <Text fontSize={15} textAlign='center'>Você finalizou com sucesso a sua avaliação de saúde, agora clique no botão abaixo para visualizar seu relatório.</Text>
                    <Button onPress={handleOpenPDF} block mt={10}>
                        Visualizar relatório
                    </Button>
                </Div>
            ) : (
                <Text fontSize={15} textAlign='center'>Nenhum link disponível</Text>
            )}
            <Div>
                <Button onPress={nextStep} block mt={10}>Voltar</Button>
            </Div>
        </Div>
    );
}
