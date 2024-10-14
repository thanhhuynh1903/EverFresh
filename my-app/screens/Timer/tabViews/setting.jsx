import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const settingList = [
  {
    title: "Connectivity",
    description: "Connected via Wifi",
    icon: "wifi-strength-outline",
  },
  {
    title: "Plantlight Settings",
    description: "Currently ON",
    icon: "lightbulb-variant-outline",
  },
  {
    title: "Cycle Settings",
    icon: "tree-outline",
  },
  {
    title: "Aepod Sync Settings",
    icon: "sync",
  },
];

const Setting = () => {
  const renderSettingCard = (item, key) => {
    return (
      <View
        style={[styles.settingCard, { borderTopWidth: key !== 0 ? 1 : 0 }]}
        key={key}
      >
        <View style={[{ ...styles.flexRow, justifyContent: "space-between" }]}>
          <View style={{ ...styles.flexRow, gap: 8 }}>
            <Icon name={item.icon} size={18} color="rgba(59,206,172,0.75)" />
            <Text style={styles.settingCardTitle}>{item.title}</Text>
          </View>
          <View style={{ ...styles.flexRow, gap: 8 }}>
            <Text style={styles.settingCardDescription}>
              {item.description}
            </Text>
            <Icon name="chevron-right" size={18} color="#0C9359" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.settingContainer}>
        {settingList.map((item, key) => renderSettingCard(item, key))}
      </View>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  //logContainer

  settingContainer: {
    width: "100%",
    height: "auto",
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
    // borderWidth: 1,
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  settingCard: {
    padding: 4,
    paddingVertical: 12,
    borderColor: "rgba(6,73,44,0.1)",
  },
  settingCardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#06492C",
  },
  settingCardDescription: {
    fontWeight: "regular",
    fontSize: 14,
    color: "rgba(6,73,44,0.75)",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
