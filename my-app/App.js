// App.js
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./routing/MainStack";
import store from "./store/common";
import { ToastProvider } from "react-native-toast-notifications";
import SafeAreaWrapper from "./components/SafeAreaWrapper";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationSocket from "./socket/notificateSocket/NotificationSocket";
import firebase from "./firebaseConfig";

export default function App() {
  return (
    <SafeAreaWrapper>
      <Provider store={store}>
        <StripeProvider publishableKey={process.env.STRIPE_PUBLIC_KEY}>
          <ToastProvider>
            <NotificationSocket />
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </ToastProvider>
        </StripeProvider>
      </Provider>
    </SafeAreaWrapper>
  );
}
