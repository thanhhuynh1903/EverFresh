import React from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import OtpTextInput from "react-native-text-input-otp";
import Header from "../../components/header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import CustomButton from "../../components/CustomButton";
const Verification = ({ navigation }) => {
  const [otp, setOtp] = React.useState("");

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.title}>Enter code</Text>
        <Text style={styles.subtitle}>
          We’ve sent an SMS with an activation code to your phone{" "}
          <Text style={{ fontWeight: "bold", color: "#333" }}>
            +849111190001
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
        <CustomButton onPressName={"Main"} navigation={navigation}>
          <Text style={styles.signInButtonText}>Verify</Text>
        </CustomButton>
        <Text style={styles.signUpText}>
          Send code again <Text style={styles.signUpLink}>0:20</Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "start",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "start",
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
    marginTop: 10,
    fontWeight: "500",
  },
  signUpLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default Verification;
