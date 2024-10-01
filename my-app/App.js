// App.js
import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routing/MainStack';
import store from './store/common';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
