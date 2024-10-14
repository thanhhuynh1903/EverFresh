import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/header";
import "react-async-hook"; // Ensure this is imported if required

export default function LoginScreen({ navigation }) {
  const [countryCode, setCountryCode] = useState("VN");
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [syncContacts, setSyncContacts] = useState(false);
  const [callingCode, setCallingCode] = useState("+84");
  const [countryName, setCountryName] = useState("Vietnam");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCountryName(country.name);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header navigation={navigation}/>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>
          Please confirm your country code and enter the number associated with
          your account.
        </Text>

        <View style={[styles.inputContainer, Platform.OS === "android" ? {paddingVertical : 8} : "null"]}>
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withFilter
            onSelect={onSelect}
            containerButtonStyle={styles.countryPicker}
          />
          <Text>{countryName}</Text>
        </View>
        <View style={styles.inputContainer_2}>
          <Text style={styles.textCode}>({callingCode})</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="0 00 00 00 00"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.syncContactsContainer}>
          <Text>Sync Contacts</Text>
          <Switch value={syncContacts} onValueChange={setSyncContacts} />
        </View>

        <CustomButton onPressName={"verify"} navigation={navigation}>
          <Text style={styles.signInButtonText}>Continue</Text>
        </CustomButton>

        <Text style={styles.signUpText}>
          Don’t have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("CreateAnAccount")}
          >
            Sign up
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 5,

  },
  inputContainer_2: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom:20
  },
  countryPicker: {
    textAlign:"center",
    marginRight: 10,
  },
  textCode:{
    width:50,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
  },
  syncContactsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  signUpText: {
    textAlign: "center",
    marginTop: 10,
  },
  signUpLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
