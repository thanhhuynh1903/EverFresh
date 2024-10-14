import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const plantList = [
  {
    _id: "67065a4817184485bdac2590",
    name: "Peperomia",
    sub_name: "Peperomia Plant",
    genus_id: {
      _id: "67063c20591dd97cef2023bc",
      name: "Hemerocallis",
      createdAt: "2024-10-09T08:17:36.331Z",
      updatedAt: "2024-10-09T08:26:10.497Z",
      __v: 0,
    },
    img_url: [
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/plant1.png?alt=media&token=faaa9013-609d-4b34-870d-a72a4b22bb60",
    ],
    video_url: ["string"],
    height: "2 meters",
    width: "1 meters",
    zones: "Zone 5-9",
    uses: "Ornamental",
    tolerance: "Drought-tolerant",
    bloom_time: "Spring",
    light: "Full sun",
    moisture: "Well-drained",
    maintenance: "Moderate",
    growth_rate: "Fast",
    plant_type_id: {
      _id: "67063c3b591dd97cef2023c3",
      plant_type_name: "Perennials",
      createdAt: "2024-10-09T08:18:03.207Z",
      updatedAt: "2024-10-09T08:26:44.819Z",
      __v: 0,
    },
    plant_seasonal_interest: "Spring blooms",
    describe: "A beautiful climbing rose with pink flowers",
    noteworthy_characteristics: "Thorny stems",
    care: "Prune after blooming, water weekly.",
    propagation: "By cutting",
    problems: "Aphids",
    water: "Water regularly",
    humidity: "Moderate",
    fertilizer: "Use balanced fertilizer monthly",
    size: "Medium",
    price: 100000,
    status: "In Stock",
    createdAt: "2024-10-09T10:26:16.548Z",
    updatedAt: "2024-10-10T14:24:06.449Z",
    __v: 0,
  },
  {
    _id: "67065a7317184485bdac2594",
    name: "Watermelon Peperomia",
    sub_name: "Watermelon Peperomia Plant",
    genus_id: {
      _id: "67063c20591dd97cef2023bc",
      name: "Hemerocallis",
      createdAt: "2024-10-09T08:17:36.331Z",
      updatedAt: "2024-10-09T08:26:10.497Z",
      __v: 0,
    },
    img_url: [
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/plant2.png?alt=media&token=a90da65a-ecf3-41d9-9702-eb75949bd4e2",
    ],
    video_url: ["string"],
    height: "2 meters",
    width: "1 meters",
    zones: "Zone 5-9",
    uses: "Ornamental",
    tolerance: "Drought-tolerant",
    bloom_time: "Spring",
    light: "Full sun",
    moisture: "Well-drained",
    maintenance: "Moderate",
    growth_rate: "Fast",
    plant_type_id: {
      _id: "67063c3b591dd97cef2023c3",
      plant_type_name: "Perennials",
      createdAt: "2024-10-09T08:18:03.207Z",
      updatedAt: "2024-10-09T08:26:44.819Z",
      __v: 0,
    },
    plant_seasonal_interest: "Spring blooms",
    describe: "A beautiful climbing rose with pink flowers",
    noteworthy_characteristics: "Thorny stems",
    care: "Prune after blooming, water weekly.",
    propagation: "By cutting",
    problems: "Aphids",
    water: "Water regularly",
    humidity: "Moderate",
    fertilizer: "Use balanced fertilizer monthly",
    size: "Medium",
    price: 170000,
    status: "In Stock",
    createdAt: "2024-10-09T10:26:59.076Z",
    updatedAt: "2024-10-10T14:24:21.290Z",
    __v: 0,
  },
  {
    _id: "67065a7317184485bdac2594",
    name: "Watermelon Peperomia",
    sub_name: "Watermelon Peperomia Plant",
    genus_id: {
      _id: "67063c20591dd97cef2023bc",
      name: "Hemerocallis",
      createdAt: "2024-10-09T08:17:36.331Z",
      updatedAt: "2024-10-09T08:26:10.497Z",
      __v: 0,
    },
    img_url: [
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/plant2.png?alt=media&token=a90da65a-ecf3-41d9-9702-eb75949bd4e2",
    ],
    video_url: ["string"],
    height: "2 meters",
    width: "1 meters",
    zones: "Zone 5-9",
    uses: "Ornamental",
    tolerance: "Drought-tolerant",
    bloom_time: "Spring",
    light: "Full sun",
    moisture: "Well-drained",
    maintenance: "Moderate",
    growth_rate: "Fast",
    plant_type_id: {
      _id: "67063c3b591dd97cef2023c3",
      plant_type_name: "Perennials",
      createdAt: "2024-10-09T08:18:03.207Z",
      updatedAt: "2024-10-09T08:26:44.819Z",
      __v: 0,
    },
    plant_seasonal_interest: "Spring blooms",
    describe: "A beautiful climbing rose with pink flowers",
    noteworthy_characteristics: "Thorny stems",
    care: "Prune after blooming, water weekly.",
    propagation: "By cutting",
    problems: "Aphids",
    water: "Water regularly",
    humidity: "Moderate",
    fertilizer: "Use balanced fertilizer monthly",
    size: "Medium",
    price: 170000,
    status: "In Stock",
    createdAt: "2024-10-09T10:26:59.076Z",
    updatedAt: "2024-10-10T14:24:21.290Z",
    __v: 0,
  },
  {
    _id: "67065a7317184485bdac2594",
    name: "Watermelon Peperomia",
    sub_name: "Watermelon Peperomia Plant",
    genus_id: {
      _id: "67063c20591dd97cef2023bc",
      name: "Hemerocallis",
      createdAt: "2024-10-09T08:17:36.331Z",
      updatedAt: "2024-10-09T08:26:10.497Z",
      __v: 0,
    },
    img_url: [
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/plant2.png?alt=media&token=a90da65a-ecf3-41d9-9702-eb75949bd4e2",
    ],
    video_url: ["string"],
    height: "2 meters",
    width: "1 meters",
    zones: "Zone 5-9",
    uses: "Ornamental",
    tolerance: "Drought-tolerant",
    bloom_time: "Spring",
    light: "Full sun",
    moisture: "Well-drained",
    maintenance: "Moderate",
    growth_rate: "Fast",
    plant_type_id: {
      _id: "67063c3b591dd97cef2023c3",
      plant_type_name: "Perennials",
      createdAt: "2024-10-09T08:18:03.207Z",
      updatedAt: "2024-10-09T08:26:44.819Z",
      __v: 0,
    },
    plant_seasonal_interest: "Spring blooms",
    describe: "A beautiful climbing rose with pink flowers",
    noteworthy_characteristics: "Thorny stems",
    care: "Prune after blooming, water weekly.",
    propagation: "By cutting",
    problems: "Aphids",
    water: "Water regularly",
    humidity: "Moderate",
    fertilizer: "Use balanced fertilizer monthly",
    size: "Medium",
    price: 170000,
    status: "In Stock",
    createdAt: "2024-10-09T10:26:59.076Z",
    updatedAt: "2024-10-10T14:24:21.290Z",
    __v: 0,
  },
  {
    _id: "67065a7317184485bdac2594",
    name: "Watermelon Peperomia",
    sub_name: "Watermelon Peperomia Plant",
    genus_id: {
      _id: "67063c20591dd97cef2023bc",
      name: "Hemerocallis",
      createdAt: "2024-10-09T08:17:36.331Z",
      updatedAt: "2024-10-09T08:26:10.497Z",
      __v: 0,
    },
    img_url: [
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/plant2.png?alt=media&token=a90da65a-ecf3-41d9-9702-eb75949bd4e2",
    ],
    video_url: ["string"],
    height: "2 meters",
    width: "1 meters",
    zones: "Zone 5-9",
    uses: "Ornamental",
    tolerance: "Drought-tolerant",
    bloom_time: "Spring",
    light: "Full sun",
    moisture: "Well-drained",
    maintenance: "Moderate",
    growth_rate: "Fast",
    plant_type_id: {
      _id: "67063c3b591dd97cef2023c3",
      plant_type_name: "Perennials",
      createdAt: "2024-10-09T08:18:03.207Z",
      updatedAt: "2024-10-09T08:26:44.819Z",
      __v: 0,
    },
    plant_seasonal_interest: "Spring blooms",
    describe: "A beautiful climbing rose with pink flowers",
    noteworthy_characteristics: "Thorny stems",
    care: "Prune after blooming, water weekly.",
    propagation: "By cutting",
    problems: "Aphids",
    water: "Water regularly",
    humidity: "Moderate",
    fertilizer: "Use balanced fertilizer monthly",
    size: "Medium",
    price: 170000,
    status: "In Stock",
    createdAt: "2024-10-09T10:26:59.076Z",
    updatedAt: "2024-10-10T14:24:21.290Z",
    __v: 0,
  },
];

const Products = () => {
  const renderPlantCard = (item, key) => {
    if (!item) return;
    return (
      <TouchableOpacity
        style={styles.plantCard}
        // onPress={() => navigation.navigate("PlantDetail", { plant: item })}
        key={key}
      >
        <ImageBackground
          source={
            item.background ||
            require("../../../assets/shopping/Rectangle9CE5CB.png")
          }
          style={styles.plantCardBackground}
          resizeMode="contain"
        >
          <View style={styles.plantCardInfor}>
            <View style={styles.plantCardLabelContainer}>
              <Text style={styles.plantCardLabel}>{item.uses}</Text>
              <Image
                source={require("../../../assets/shopping/pawIcon.png")}
                style={styles.plantCardLabelIcon}
              />
            </View>
            <Text numberOfLines={1} style={styles.plantCardName}>
              {item.name}
            </Text>
            <View style={styles.plantCardBottom}>
              <Text>Status: Healthy</Text>
            </View>
          </View>
          <View style={styles.plantImageContainer}>
            <Image
              source={
                item?.img_url && item?.img_url[0]
                  ? { uri: item?.img_url[0] || "" }
                  : require("../../../assets/cart/plant1.png")
              }
              style={styles.plantImage}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.flexRow, styles.container]}>
      <View style={styles.productList}>
        {plantList.map((item, key) => renderPlantCard(item, key))}
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productList: {
    position: "relative",
    margin: WIDTH * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: HEIGHT * 0.25,
    // justifyContent: "space-between",
  },

  //plantCard
  plantCard: {
    width: WIDTH * 0.88,
    height: WIDTH * 0.46,
    paddingHorizontal: WIDTH * 0.05,
  },
  plantCardBackground: {
    position: "relative",
    width: "97%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ translateX: -16 }],
  },
  plantCardInfor: {
    padding: 24,
    paddingTop: 36,
  },
  plantCardLabelContainer: {
    flexDirection: "row",
    gap: 24,
  },
  plantCardLabel: {
    fontSize: 14,
    color: "#002140",
    fontWeight: "semibold",
  },
  plantCardName: {
    width: "80%",
    fontSize: 38,
    fontWeight: "bold",
    color: "#002140",
  },
  plantCardBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: "10%",
  },
  plantCardPrice: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#002140",
    marginTop: 32,
    marginRight: 32,
  },
  plantCardFeature: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  plantCardFeatureIcon: {
    transform: [{ translateY: 24 }],
  },
  plantImageContainer: {
    width: "50%",
    height: "100%",
    position: "absolute",
    right: "-20%",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
