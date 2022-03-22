import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hot from '../page/home';
import Details from '../page/detail';

const stack = createNativeStackNavigator();

/* se inicializa en home con la lista y se agrega la pantalla detail para esto se uso el Stack*/
const Router = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName="Home">
                <stack.Screen name="Home" component={Hot}/>
                <stack.Screen name="Details" component={Details}/>
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Router