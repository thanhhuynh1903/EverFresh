import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  Text,
} from "react-native";

const WIDTH = Dimensions.get("window").width;

export default function ColorBar({ setCustomPlant }) {
  const [colorList, setColorList] = useState([
    { color: "#C38364" },
    { color: "#002140" },
    { color: "#EEE7DC" },
    { color: "#FFD2B6" },
    { color: "#CEE1DF" },
    { color: "#749281" },
    { color: "#CF604E" },
  ]);

  const handlePress = (item, index) => {
    const middleIndex = 3;
    const shift = middleIndex - index;

    // Create a new list so state is updated immutably
    const newList = [...colorList];
    for (let i = 0; i < Math.abs(shift); i++) {
      if (shift > 0) {
        newList.unshift(newList.pop());
      } else {
        newList.push(newList.shift());
      }
    }
    setCustomPlant((prevState) => {
      return { ...prevState, planterColor: item.color };
    });
    setColorList(newList);
  };

  const renderColorItem = (item, key) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.colorItem,
          backgroundColor: item.color,
          width: key === 3 ? WIDTH * 0.08 : WIDTH * 0.06,
          height: key === 3 ? WIDTH * 0.08 : WIDTH * 0.06,
        }}
        onPress={() => handlePress(item, key)}
        key={key}
      />
    );
  };

  return (
    <View style={styles.colorbar}>
      {colorList.map((item, key) => renderColorItem(item, key))}
    </View>
  );
}

const styles = {
  colorbar: {
    position: "absolute",
    top: "20%",
    bottom: "20%",
    left: "30%",
    width: WIDTH * 0.1,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#203901",
  },
  colorItem: {
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
    borderRadius: 50,
  },
};
