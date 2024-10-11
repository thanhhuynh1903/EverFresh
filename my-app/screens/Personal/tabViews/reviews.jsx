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

const reviewList = [
  {
    descripktion:
      "Thanks for the plant! This looks so good with my personality!",
    data: "Jan 24, 2024",
    plant: "Plant A",
    plant_name: "Meyes",
    rate: 5.0,
  },
  {
    descripktion:
      "As always, thank you so much for the good quality of the plant. Will sure to buy again soon!",
    data: "Jan 24, 2024",
    plant: "Plant A",
    plant_name: "Mimi",
    rate: 5.0,
  },
  {
    descripktion:
      "Thanks for the plant! This looks so good with my personality!",
    data: "Jan 24, 2024",
    plant: "Plant A",
    plant_name: "Meyes",
    rate: 5.0,
  },
];

const Reviews = () => {
  const renderReviewCard = (item, key) => {
    return (
      <View style={styles.reviewItem} key={key}>
        <Image
          source={require("../../../assets/utilsImage/format_quote.png")}
        />
        <Text style={styles.reviewsDescription}>{item.descripktion}</Text>
        <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
          <View>
            <Text style={styles.reviewsInfo}>
              Plant: {item.plant} (Name: {item.plant_name})
            </Text>
            <Text style={styles.reviewsInfo}>Ordered {item.data}</Text>
          </View>
          <View style={[styles.flexRow, styles.rate]}>
            <Icon name="star" size={20} color="#FFA24D" />
            <Text style={{ fontWeight: "bold" }}>{item.rate.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.flexRow, styles.container]}>
      <View style={styles.reviewsList}>
        {reviewList.map((item, key) => renderReviewCard(item, key))}
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  reviewsList: {
    position: "relative",
    margin: WIDTH * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: HEIGHT * 0.25,
    // justifyContent: "space-between",
  },
  reviewItem: {
    width: "100%",
    borderBottomWidth: 1,
    gap: 12,
    paddingVertical: 12,
  },
  reviewsDescription: {
    fontWeight: "regular",
    fontSize: 14,
  },
  reviewsInfo: {
    fontWeight: "regular",
    fontSize: 12,
    color: "#6D6D6D",
  },
  rate: {
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 50,
    borderWidth: 1,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
