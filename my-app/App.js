// App.js
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./routing/MainStack";
import store from "./store/common";
import { ToastProvider } from "react-native-toast-notifications";
import SafeAreaWrapper from "./components/SafeAreaWrapper";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <SafeAreaWrapper>
      <StripeProvider publishableKey={process.env.STRIPE_PUBLIC_KEY}>
        <ToastProvider>
          <Provider store={store}>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </Provider>
        </ToastProvider>
      </StripeProvider>
    </SafeAreaWrapper>
  );
}
