import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const logList = [
  {
    type: "watering",
    title: "Water Refill Due",
    description:
      "This Planter’s water level is low (10%), you should refill it.",
  },
  {
    type: "new_cycle",
    title: "New cycle started",
    description: "You just started a new cycle, time to grow new plants 😊 ",
  },
  {
    type: "harvest",
    title: "Oregano ready for harvest",
    description:
      "This Planter’s water level is low (10%), you should refill it.",
  },
  {
    type: "harvest",
    title: "Oregano ready for harvest",
    description:
      "This Planter’s water level is low (10%), you should refill it.",
  },
];

const Log = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const renderLogCard = (item, key) => {
    switch (item?.type) {
      case "watering":
        return (
          <View style={[styles.logCard, styles.wateringCard]} key={key}>
            <View
              style={[
                { ...styles.flexRow, justifyContent: "space-between" },
                styles.wateringHeader,
              ]}
            >
              <View style={{ ...styles.flexRow, gap: 8 }}>
                <Icon name="alert-outline" size={18} color="white" />
                <Text style={styles.wateringHeaderTitle}>{item.title}</Text>
              </View>
              <Text style={styles.wateringHeaderTime}>5hr ago</Text>
            </View>
            <View
              style={[
                {
                  ...styles.wateringContent,
                  borderBottomWidth: 1,
                  borderColor: "rgba(6,73,44,0.1)",
                },
              ]}
            >
              <Text>{item.description}</Text>
            </View>
            <View
              style={[
                { ...styles.flexRow, justifyContent: "space-between" },
                styles.wateringContent,
              ]}
            >
              <Text style={styles.wateringRefill}>Refill Now</Text>
              <View style={styles.chevronIconBackground}>
                <Icon name="chevron-right" size={18} color="#0C9359" />
              </View>
            </View>
          </View>
        );
      case "new_cycle":
        return (
          <View style={[styles.logCard, styles.newCycleCard]} key={key}>
            <View style={[styles.flexRow, styles.newCycleHeader]}>
              <View style={{ ...styles.flexRow, gap: 8 }}>
                <Icon
                  name="chevron-right-circle-outline"
                  size={18}
                  color="rgba(6,73,44,0.5)"
                />
                <Text style={styles.logCardTitle}>{item.title}</Text>
              </View>
              <Text>5m</Text>
            </View>
            <Text>{item.description}</Text>
          </View>
        );
      default:
        return (
          <View style={[styles.logCard, styles.harvestCard]} key={key}>
            <View style={[styles.flexRow, styles.harvestHeader]}>
              <View style={{ ...styles.flexRow }}>
                <Icon name="tree-outline" size={18} color="rgba(6,73,44,0.5)" />
                <Text style={styles.logCardTitle}>{item.title}</Text>
              </View>
              <Text>2 days ago</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <View style={[styles.flexRow, styles.sortContainer]}>
        <Text style={styles.sortLabel}>Sort by:</Text>

        <View style={styles.flexRow}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={
              [
                // { label: "Urgency: High to Low", value: "apple" },
                // { label: "Banana", value: "banana" },
                // { label: "Orange", value: "orange" },
              ]
            }
            placeholder={{ label: "Urgency: High to Low", value: "apple" }}
            style={pickerSelectStyles}
          />
          <Icon
            name="chevron-down"
            size={20}
            color="rgba(59, 206, 172, 0.75)"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.logContainer}>
        {logList.map((item, key) => renderLogCard(item, key))}
      </View>
    </>
  );
};

export default Log;

const styles = StyleSheet.create({
  sortContainer: {
    width: "100%",
    height: "auto",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    // borderWidth: 1,
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  sortLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgba(6,73,44,0.75)",
  },
  sortDropdown: {
    flex: 1,
    borderWidth: 1,
  },

  //logContainer

  logContainer: {
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
  logCard: {
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(6,73,44,0.1)",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  wateringCard: {
    padding: 0,
  },
  wateringHeader: {
    backgroundColor: "#0C9359",
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  wateringHeaderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  wateringHeaderTime: {
    fontSize: 14,
    color: "white",
  },
  wateringContent: {
    padding: 8,
  },
  wateringRefill: {
    fontWeight: "bold",
    fontSize: 18,
    color: "rgba(12,147,89,1)",
  },
  chevronIconBackground: {
    padding: 6,
    backgroundColor: "rgba(12,147,89,0.05)",
    borderRadius: 50,
  },
  //   newCycleCard
  newCycleHeader: {
    // padding: 4,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  logCardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgba(12,147,89,1)",
  },
  //   harvestHeader
  harvestHeader: {
    justifyContent: "space-between",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 12,
    // paddingHorizontal: WIDTH * 0.4,
    // borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#000",
    // paddingRight: 12,
    fontWeight: "bold",
    fontSize: 16,
    color: "rgba(6,73,44,0.75)",
    // textAlign: "right",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#000",
    // paddingRight: 30, // to ensure the text is not behind the icon
  },
  placeholder: {
    color: "rgba(6,73,44,0.75)",

    fontSize: 16,
  },
});
