import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { useNavigation } from '@react-navigation/native';

const QuestionContext = React.createContext();

const pointsMapper = [
    {
        option1: 5,
        option1: 0,
    },
];

export default function QuestionsContextProvider ({ children }) {
    const [points, setPoints] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    
    // const addPoints = (points) => {
    //     setPoints(points);
    // }

    // React.useEffect(() => {
    //     if (currentStep == 0) {
    //         setPoints(0);
    //     }
    // }, [points]);

    return (
        <QuestionContext.Provider value={{ currentStep, setCurrentStep, points, setPoints }}>
            {children}
        </QuestionContext.Provider>
    );
}

export { QuestionContext };