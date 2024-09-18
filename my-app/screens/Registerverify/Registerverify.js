import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import OtpTextInput from "react-native-text-input-otp";
import Header from "../../components/header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Modal from "../../components/Overlay";
import { Platform } from "react-native";
const Registerverify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(""); // State to manage modal visibility

  const handleVerifyPress = () => {
    setIsModalVisible(true); // Show the modal when Verify is pressed
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        
        <Header navigation={navigation} />
        <Text style={styles.title}>Verify your phone number</Text>
        <Text style={styles.subtitle}>
          We’ve sent an SMS with an activation code to your phone{" "}
          <Text style={{ fontWeight: "bold", color: "#333" }}>
            +33 2 94 27 84 11
          </Text>
        </Text>
        <View style={styles.inputContainer}>
          <OtpTextInput
            otp={otp}
            setOtp={setOtp}
            digits={5}
            style={{
              borderRadius: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              height: 45,
            }}
            fontStyle={{ fontSize: 20, fontWeight: "bold" }}
            focusedStyle={{ borderColor: "#5cb85c", borderBottomWidth: 2 }}
          />
        </View>

        <Text style={styles.signUpText}>
          I didn’t receive a code?{" "}
          <Text style={styles.signUpLink}> Resend</Text>
        </Text>

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={handleVerifyPress}
        >
          <Text style={styles.signInButtonText}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        navigation={navigation}
        modevisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 5,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  signUpText: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "500",
  },
  signUpLink: {
    color: "black",
    fontWeight: "bold",
  },
  ButtonStyle: {
    zIndex: 5,
    backgroundColor: "#0D986A",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default Registerverify;
