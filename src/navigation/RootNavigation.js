import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer theme={{ colors: { background: '#000000' } }}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='BottomTab' component={BottomTabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;
