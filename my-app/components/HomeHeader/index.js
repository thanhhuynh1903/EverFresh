import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function HomeHeader({
  navigation,
  handleMenuToggle,
  backgroundColor,
}) {
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: backgroundColor ? backgroundColor : "white",
      }}
    >
      <Image
        source={require("../../assets/img/logo.png")}
        style={styles.iconstyle}
      />
      <View style={styles.fetureList}>
        <TouchableOpacity>
          <Icon name="bell-outline" size={32} color="#FCCC1F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenuToggle}>
          <Icon name="menu" size={32} color="#0D986A" />
        </TouchableOpacity>
      </View>
      {/* <BackButton navigation={navigation} />
            <LogoCorner /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEIGHT * 0.05,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
    zIndex: 10,

    shadowColor: "rgba(0,0,0,0.1)", // Black color
    shadowOffset: { width: 0, height: -4 }, // X: 0, Y: -4
    shadowOpacity: 0.1, // 10% opacity
    shadowRadius: 14, // Blur: 14
    elevation: 3,
  },
  iconstyle: {
    width: WIDTH * 0.15,
    height: HEIGHT * 0.05,
    resizeMode: "contain",
  },
  fetureList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.18,
    height: HEIGHT * 0.05,
    gap: 12,
    marginRight: 12,
  },
});
