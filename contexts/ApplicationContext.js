import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { useNavigation } from '@react-navigation/native';

const ApplicationContext = React.createContext();

export default function ApplicationContextProvider ({ children }) {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const { get } = useHttp();

    const getUser = async () => {
        try {
            const response = await get(`/api/auth/details`);

            if (!response) {
                navigation.navigate('Login');
            }
            if (response !== null) {
                setUser(JSON.parse(response));
            }
        } catch (error) {
            console.error('Error getting user from storage:', error);
        }
    }

    useEffect(() => {
        getUser();
    } , []);

    return (
        <ApplicationContext.Provider value={{points: 0}}>
            {children}
        </ApplicationContext.Provider>
    );
}

export { ApplicationContext };