// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routing/MainStack';
export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
