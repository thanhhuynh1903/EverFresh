import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserThunk, loginThunk } from "../../redux/thunk/userThunk";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import { getGallery } from "../../api/gallery";
import {
  getAllPlantsFromGalleryThunk,
  getGaleryThunk,
} from "../../redux/thunk/galleryThunk";
import { getNotificationThunk } from "../../redux/thunk/notificationThunk";
import { TouchableOpacity } from "react-native-gesture-handler";
import LogoCorner from "../../components/logo-corner";
import GAuth from "../../components/GoogleAuth/GAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "@react-native-firebase/auth";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In on component mount
    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "1018818217852-208hfol82677jsn845k6830oe4l0up7e.apps.googleusercontent.com",
    });

    // Optional cleanup when the component unmounts
    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleCheckToken();
    }, [])
  );

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken);

    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  }

  handleCheckToken = async () => {
    setLoading(true);
    const userResponse = await dispatch(getCurrentUserThunk());
    if (
      userResponse.meta.requestStatus === "fulfilled" &&
      userResponse.payload.status === 200
    ) {
      await loadRedux();
      navigation.navigate("Main");
    } else {
      console.log("Failed to fetch user data or invalid status");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);

    const response = await dispatch(loginThunk({ email, password }));

    if (response.meta.requestStatus === "fulfilled") {
      // If login successful
      const userResponse = await dispatch(getCurrentUserThunk());

      if (
        userResponse.meta.requestStatus === "fulfilled" &&
        userResponse.payload.status === 200
      ) {
        await loadRedux();
        navigation.navigate("Main");
      } else {
        console.log("Failed to fetch user data or invalid status");
      }
    } else {
      console.log("Login failed: ", response.payload); // Handle error
    }
    setLoading(false);
  };

  const loadRedux = async () => {
    await dispatch(getCartItemsThunk());
    await dispatch(getNotificationThunk());
    await dispatch(getGaleryThunk()).then((response) => {
      dispatch(getAllPlantsFromGalleryThunk(response.payload));
    });
  };

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Text>Username</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={"#FFFFFF"}
          style={{ width: "90%", padding: 6, borderWidth: 1 }}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={"#FFFFFF"}
          style={{ width: "90%", padding: 6, borderWidth: 1 }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          onPress={handleLogin}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
        />
      </View> */}

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.or}>Or</Text>
          <View style={styles.otherLogin}>
            {/* <GAuth handleCheckToken={handleCheckToken} /> */}
            <TouchableOpacity
              style={styles.googleIconContainer}
              onPress={onGoogleButtonPress}
            >
              <Image
                resizeMode="cover"
                style={styles.googleIcon}
                source={require("../../assets/utilsImage/google.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && <SpinnerLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3CC",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFF3CC",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#0D986A",
    backgroundColor: "white",
    paddingHorizontal: 32,
    paddingTop: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    justifyContent: "center",
  },
  label: {
    color: "#4B5563",
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: "bold",
  },
  input: {
    padding: 16,
    backgroundColor: "#F3F4F6",
    color: "#4B5563",
    borderRadius: 24,
    marginBottom: 16,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#4B5563",
  },
  loginButton: {
    paddingVertical: 12,
    backgroundColor: "#FBBF24",
    borderRadius: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#4B5563",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 200,
  },
  or: { textAlign: "center", marginVertical: 12 },
  otherLogin: {
    justifyContent: "center",
    alignItems: "center",
  },
  googleIconContainer: {
    padding: 12,
    width: WIDTH * 0.15,
    height: WIDTH * 0.15,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
  },
  googleIcon: {
    width: "100%",
    height: "100%",
  },
});
