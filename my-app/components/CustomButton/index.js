import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function CustomButton({ children, style, onPressName,navigation }) {
  //extra use for override or add more style <CustomButton style={styles.customStyle}>
  
  return (
    <TouchableOpacity
      style={[styles.ButtonStyle,style]}
      onPress={() => navigation.navigate(onPressName)}
    >
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  ButtonStyle: {
    backgroundColor: "#0D986A",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
});
