import { View, Text, TextInput, Button, Dimensions } from "react-native";
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
    <SafeAreaWrapper>
      <View
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
      </View>
      {loading && <SpinnerLoading />}
    </SafeAreaWrapper>
  );
}
