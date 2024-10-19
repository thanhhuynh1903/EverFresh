import React, { useEffect } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { loginGoogle } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GoogleSignInComponent({ handleCheckToken }) {
  useEffect(() => {
    // Configure Google Sign-In on component mount
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // Add other scopes if needed
      webClientId:
        "863903622013-rpu0k9b234i480rgcma15dbqh325rkco.apps.googleusercontent.com", // Ensure this is correct for both web and mobile clients
    });

    // Optional cleanup when the component unmounts
    return () => {};
  }, []);

  const handleLoginGoogle = async (userInfo) => {
    try {
      const { idToken } = userInfo; // Extract idToken from user info

      // Send token to backend for further processing
      const response = await loginGoogle({ token: idToken });
      console.log("Login response status:", response.status);

      if (response.status === 200) {
        await AsyncStorage.setItem("accessToken", response?.data?.accessToken);
        await handleCheckToken(); // Check and handle token
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices();

      // Initiate the Google Sign-In process
      const userInfo = await GoogleSignin.signIn();

      // Handle successful login
      await handleLoginGoogle(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Google sign-in was cancelled by the user.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google sign-in is already in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services are not available or outdated.");
      } else {
        console.log("An error occurred during Google sign-in:", error);
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={onGoogleButtonPress}
    />
  );
}
