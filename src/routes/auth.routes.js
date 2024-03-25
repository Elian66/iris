import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';



const AuthStack = createNativeStackNavigator();



function AuthRoutes(){
  return(
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen 
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />

        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerStyle:{
              backgroundColor: '#3b3dbf',
              borderBottomWidth: 1,
              borderBottomColor: '#00b94a'
            },
            headerTintColor: '#FFF',
            headerTitle: 'Voltar',
            headerBackTitleVisible: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes;