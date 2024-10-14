import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import LogoCorner from "../logo-corner";
import SafeAreaWrapper from "../SafeAreaWrapper";
export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <BackButton navigation={navigation} />
      <LogoCorner />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
