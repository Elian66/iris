import React, { useEffect, useState } from 'react';
import { Button, Div, Text, Skeleton } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { Dimensions, Alert, Image } from 'react-native';

export default function Question10({ navigation }) {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pdfUri, setPdfUri] = useState(null);

    const pdfUrls = {
        1: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris1.pdf')).uri,
        2: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris2.pdf')).uri,
        3: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris3.pdf')).uri,
        4: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris4.pdf')).uri,
        5: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris5.pdf')).uri,
        6: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris6.pdf')).uri,
        7: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris7.pdf')).uri,
        8: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris8.pdf')).uri,
        9: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris9.pdf')).uri,
        10: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris10.pdf')).uri,
        11: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris11.pdf')).uri,
        12: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris12.pdf')).uri,
        13: Image.resolveAssetSource(require('../../assets/pdfs/relatorioDiagnosticoIris13.pdf')).uri,
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
            points += Number(value) || 0; // Garante que o valor é tratado como número
        }
        return points;
    };

    useEffect(() => {
        const fetchPoints = async () => {
            getCurrentDateTime();
            const points = await sumPoints();
            setPoints(points);
            setLoading(false);

            console.log('Points:', points);
            console.log('PDF URLs:', pdfUrls);

            // Determine the correct PDF URL based on points
            let pdfSource = null;
            if (points >= 1 && points <= 10) {
                pdfSource = pdfUrls[1];
            } else if (points >= 11 && points <= 20) {
                pdfSource = pdfUrls[2];
            } else if (points >= 21 && points <= 30) {
                pdfSource = pdfUrls[3];
            } else if (points >= 31 && points <= 40) {
                pdfSource = pdfUrls[4];
            } else if (points >= 41 && points <= 50) {
                pdfSource = pdfUrls[5];
            } else if (points >= 51 && points <= 60) {
                pdfSource = pdfUrls[6];
            } else if (points >= 61 && points <= 70) {
                pdfSource = pdfUrls[7];
            } else if (points >= 71 && points <= 80) {
                pdfSource = pdfUrls[8];
            } else if (points >= 81 && points <= 90) {
                pdfSource = pdfUrls[9];
            } else if (points >= 91 && points <= 100) {
                pdfSource = pdfUrls[10];
            } else if (points >= 101 && points <= 110) {
                pdfSource = pdfUrls[11];
            } else if (points >= 111 && points <= 120) {
                pdfSource = pdfUrls[12];
            } else {
                pdfSource = pdfUrls[13];
            }

            console.log('PDF Source:', pdfSource);

            if (pdfSource) {
                RNFetchBlob.config({
                    fileCache: true,
                    appendExt: 'pdf'
                })
                .fetch('GET', pdfSource)
                .then((res) => {
                    setPdfUri(res.path());
                    console.log('PDF URI after fetch:', res.path());
                })
                .catch((error) => {
                    Alert.alert('Erro ao carregar o PDF', error.message);
                    console.error(error);
                });
            }
        };

        fetchPoints();
    }, []);

    useEffect(() => {
        console.log('PDF URI:', pdfUri);
    }, [pdfUri]);

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

    return (
        <Div p={20} flex={1} justifyContent='center'>
            <Text fontSize={20} textAlign='center'>{points} pontos</Text>
            {pdfUri ? (
                <Pdf
                    source={{ uri: pdfUri }}
                    style={{ flex: 1, width: Dimensions.get('window').width }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        Alert.alert('Erro ao carregar o PDF', error.message);
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                />
            ) : (
                <Text fontSize={15} textAlign='center'>Nenhum PDF disponível</Text>
            )}
            <Text fontSize={15} textAlign='center'>Você finalizou com sucesso a sua avaliação de saúde, agora clique no menu na opção "Finalizar". </Text>
            <Div >
                <Button onPress={nextStep} block mt={10}>Finalizar</Button>
            </Div>
        </Div>
    );
}
