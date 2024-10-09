import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function OrderStatusBar(route) {
  const totalItems = route?.orderStatusList.length - 1;
  const lastCheckedIndex = useMemo(() => {
    for (let i = route?.orderStatusList.length - 1; i >= 0; i--) {
      if (route?.orderStatusList[i].checked) {
        return i;
      }
    }
    return -1; // Return -1 if no item with checked: true is found
  }, [route?.orderStatusList]);

  const renderDot = (item, index) => {
    return (
      <View
        style={{
          ...styles.dot,
          backgroundColor: lastCheckedIndex >= index ? "#12B76A" : "#D0D5DD",
        }}
        key={index}
      >
        <Text
          style={{
            ...styles.dotName,
            color: lastCheckedIndex >= index ? "#12B76A" : "#000000",
          }}
        >
          {item.name}
        </Text>
        <Text style={styles.dotTime}>{item.date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View
          style={{
            ...styles.completerBar,
            width: `${
              lastCheckedIndex >= 0 ? lastCheckedIndex * (100 / totalItems) : 0
            }%`,
          }}
        />
        <View style={styles.dotList}>
          {route?.orderStatusList?.map((item, index) => renderDot(item, index))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  statusBar: {
    position: "relative",
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#D0D5DD",
  },
  completerBar: {
    position: "absolute",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#12B76A",
  },
  dotList: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
  },
  dot: {
    position: "relative",
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "#12B76A",
    transform: [{ translateY: -5 }],
    textAlign: "center",
  },
  dotName: {
    position: "absolute",
    top: "-100%",
    left: "-150%",
    width: WIDTH * 0.25,
    textAlign: "center",
    flexWrap: "nowrap",
    fontSize: 10,
    fontWeight: "medium",
  },
  dotTime: {
    position: "absolute",
    bottom: "-100%",
    left: "-120%",
    width: WIDTH * 0.2,
    flexWrap: "nowrap",
    fontSize: 10,
    fontWeight: "medium",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
