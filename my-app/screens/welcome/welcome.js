import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
export default function Welcome({ navigation }) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <View style={styles.img_container}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={{ marginVertical: 35 }}>
          <Text style={styles.title}>
            Explore with <Text style={styles.highlight}>everfresh</Text>
          </Text>
          <Text style={styles.subtitle}>
            Plant care now more accessible, efficient, and enjoyable than ever.
          </Text>
        </View>

        <CustomButton
          // onPressName={"Signin"}
          onPressName={"LoginPage"}
          navigation={navigation}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </CustomButton>
        <CustomButton
          style={styles.createAccountButton}
          onPressName={"CreateAnAccount"}
          navigation={navigation}
        >
          <Text style={styles.createAccountButtonText}>Create account</Text>
        </CustomButton>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  img_container: {
    flex: 0.55,
    // Set dimensions explicitly if necessary
    alignItems: "center", // Center content horizontally
  },
  logo: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  highlight: {
    color: "#4CAF50",
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 19,
    textAlign: "center",
    color: "#888",
    marginBottom: 40,
  },

  signInButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  createAccountButton: {
    backgroundColor: "#FFF important",
    borderWidth: 1,
    borderColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});
