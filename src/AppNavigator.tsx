import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './screens/home/HomePage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
