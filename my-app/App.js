// App.js
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./routing/MainStack";
import store from "./store/common";
import { ToastProvider } from "react-native-toast-notifications";
import SafeAreaWrapper from "./components/SafeAreaWrapper";

export default function App() {
  return (
    <SafeAreaWrapper>
      <ToastProvider>
        <Provider store={store}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </SafeAreaWrapper>
  );
}
