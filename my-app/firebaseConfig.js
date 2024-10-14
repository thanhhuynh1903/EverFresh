// firebaseSingleton.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

let firebaseApp;
let firebaseAuth;
let firebaseStorage;

const firebaseConfig = {
  apiKey: "AIzaSyCOWW46p75yVHMNJnK1alp6Bhv90Z6iBvA",
  authDomain: "everfresh-a5e2f.firebaseapp.com",
  projectId: "everfresh-a5e2f",
  storageBucket: "everfresh-a5e2f.appspot.com",
  messagingSenderId: "1018818217852",
  appId: "1:1018818217852:android:3132672675a77d29e0c6f9",
};

export const initializeFirebase = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    firebaseStorage = getStorage(firebaseApp);
  }
  return { auth: firebaseAuth, storage: firebaseStorage };
};
