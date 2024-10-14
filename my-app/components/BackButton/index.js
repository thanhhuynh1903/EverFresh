import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

export default function BackButton({navigation}) {
  return (
    <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.goBack()}>
      <Icon name="left" size={25} color="black" style={{justifyContent:"center" , alignContent:"center"}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconstyle: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#D8DADC",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "max-content",
    height: "min-content",
  },
});
