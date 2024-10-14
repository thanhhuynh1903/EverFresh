import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const plantList = [
  { img_url: require("../../../assets/personal/photo1.png") },
  { img_url: require("../../../assets/personal/photo2.png") },
  { img_url: require("../../../assets/personal/photo3.png") },
  { img_url: require("../../../assets/personal/photo4.png") },
  { img_url: require("../../../assets/personal/photo5.png") },
  { img_url: require("../../../assets/personal/photo6.png") },
  { img_url: require("../../../assets/personal/photo7.png") },
  { img_url: require("../../../assets/personal/photo8.png") },
];

const Photos = () => {
  return (
    <View style={[styles.flexRow, styles.container]}>
      <View style={styles.plantList}>
        {plantList.map((item, key) => (
          <TouchableOpacity
            style={{
              ...styles.plantItem,
              marginRight: key % 3 === 2 ? 0 : "5%",
            }}
            key={key}
          >
            <Image
              style={styles.plantImage}
              source={item.img_url}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addImage}>
          <Icon name="plus-circle" size={58} color="#009E71" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  plantList: {
    position: "relative",
    margin: WIDTH * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  plantItem: {
    marginBottom: 24,
    width: "30%",
    height: HEIGHT * 0.1,
    borderRadius: 12,
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  addImage: {
    position: "absolute",
    bottom: "5%",
    right: "0%",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
