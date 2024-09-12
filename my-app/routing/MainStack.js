// MainStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { publicRoutes } from './publicRoutes';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {publicRoutes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
      {/* <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
