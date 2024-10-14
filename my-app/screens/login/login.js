<<<<<<< HEAD
import { View, Text, TextInput, Button, Dimensions } from "react-native";
=======
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
>>>>>>> 5ff9f72a9ff3d9bdc33b36ba8057cc1343f70868
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
<<<<<<< HEAD
=======
import { TouchableOpacity } from "react-native-gesture-handler";
import LogoCorner from "../../components/logo-corner";
>>>>>>> 5ff9f72a9ff3d9bdc33b36ba8057cc1343f70868

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      handleCheckToken();
    }, [])
  );

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
<<<<<<< HEAD
    <SafeAreaWrapper>
      <View
=======
    <View style={styles.container}>
      {/* <View
>>>>>>> 5ff9f72a9ff3d9bdc33b36ba8057cc1343f70868
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
<<<<<<< HEAD
      </View>
      {loading && <SpinnerLoading />}
    </SafeAreaWrapper>
  );
}
=======
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
});
>>>>>>> 5ff9f72a9ff3d9bdc33b36ba8057cc1343f70868
