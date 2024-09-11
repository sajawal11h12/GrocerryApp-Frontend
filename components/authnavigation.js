import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WELCOMESCREEN from './welcome';
import login from './login';
import signup from './signupscreen';
import Land from '../ui';
import ListDetails from '../ListScreen';
import Headie from './header1';

const Stack = createNativeStackNavigator();

const DOT = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="header1" component={Headie} options={{ headerShown: false }} />
            <Stack.Screen name="welcome" component={WELCOMESCREEN} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
            <Stack.Screen name="signupscreen" component={signup} options={{ headerShown: false }} />
            <Stack.Screen
                name="ui"
                component={Land}
                options={{
                    headerStyle: {
                        backgroundColor: "darkorange",
                    },
                    title: "My-Lists"
                }}
            />
            <Stack.Screen
                name="ListDetails"
                component={ListDetails}
                options={{
                    headerStyle: {
                        backgroundColor: "darkorange",
                    },
                    title: "Shopping Items"
                }}
            />
        </Stack.Navigator>
    );
}

export default DOT;
