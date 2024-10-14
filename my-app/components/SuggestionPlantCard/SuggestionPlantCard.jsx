import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlantBookingCard({ plant }) {
  const [item, setItem] = useState(plant || {});
  const [detailList, setDetailList] = useState([
    {
      title: "Material",
      value: "Plastic",
    },
    {
      title: "Color",
      value: "Green",
    },
    {
      title: "Special Feature",
      value: "Lightweight",
    },
    {
      title: "Style",
      value: "Modern",
    },
    {
      title: "Planter Form",
      value: "Plant Pot",
    },
  ]);

  useEffect(() => {
    setItem(plant);
    setDetailList([
      {
        title: "Sub Name",
        value: plant.sub_name,
      },
      {
        title: "Growth Rate",
        value: plant.growth_rate,
      },
      {
        title: "Size",
        value: plant.size,
      },
      //   {
      //     title: "Style",
      //     value: "Modern",
      //   },
      {
        title: "Price",
        value: formatPrice(plant.price),
      },
    ]);
  }, [plant]);

  const renderDetail = (item, key) => {
    return (
      <View style={styles.detailContainer} key={key}>
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailValue}>{item.value}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.img_url[0] }} />
      </View>
      <Text>{item?.name}</Text>
      <Text>We don't know when or if this item will be back in stock.</Text>
      {detailList.map((item, index) => renderDetail(item, index))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.3,
    width: "100%",
    marginBottom: 24,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  detailValue: {
    color: "white",
    fontSize: 14,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
