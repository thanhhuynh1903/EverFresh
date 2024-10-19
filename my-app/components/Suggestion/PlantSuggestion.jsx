import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from "react-native";

const defaultPlant = {
  _id: "670b9f75c0d080ecfe8e0516",
  name: "Cutie SU",
  category: "Smarter Planter",
  img_object: [
    {
      img_url:
        "https://hwdtwrljzbwduxaymxtr.supabase.co/storage/v1/object/public/everfresh_bucket/public/planters/dcb02e3c-3537-48f5-802e-cccc09402c9d.jpg",
      color: "white",
      _id: "670b9f90c0d080ecfe8e0522",
    },
  ],
  video_url: ["https://example.com/videos/planter2.mp4"],
  price: 399000,
  size: "Large",
  introduction: "A stylish ceramic planter designed for modern living spaces.",
  material: "Clay",
  special_feature: "Self-watering",
  style: "Contemporary",
  planter_form: "Square",
  about: "Ideal for indoor and outdoor gardens.",
  describe: "Crafted from premium clay, this planter is built to last.",
  default_color: "Beige",
  theme: "Eco-friendly",
  finish_type: "Matte",
  item_weight: "2.0 kg",
  manufacturer: "EcoGreen Products",
  ASIN: "B08J5F6P2E",
  item_model_number: "GT-54321",
  customer_reviews: 0,
  best_seller_rank: "#15 in Home & Garden",
  date_first_available: "2023-02-10T00:00:00.000Z",
  status: "In Stock",
  createdAt: "2024-10-13T10:22:45.678Z",
  updatedAt: "2024-10-13T10:23:12.716Z",
  __v: 1,
};

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlantSuggestion({
  plant,
  color = "#0C9359",
  handleNext,
}) {
  const [suggestionPlant, setSuggestionPlant] = useState(plant || defaultPlant);
  useEffect(() => {
    setSuggestionPlant(plant || defaultPlant);
  }, [plant]);

  const [availableDetail, setAvaiableDetail] = useState([]);

  useEffect(() => {
    setAvaiableDetail([
      {
        name: "Material",
        value: suggestionPlant?.material || "",
      },
      {
        name: "Color",
        value: "Unknown",
      },
      {
        name: "Special Feature",
        value: suggestionPlant?.special_feature || "",
      },
      {
        name: "Style",
        value: suggestionPlant?.style || "",
      },
      {
        name: "Planter Form",
        value: suggestionPlant?.planter_form || "",
      },
    ]);
  }, [suggestionPlant]);

  const renderInfor = (item, key) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          marginTop: 4,
        }}
        key={key}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 12,
            color: "white",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontWeight: "regular",
            fontSize: 12,
            color: "white",
          }}
        >
          {item.value}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.plantCard, backgroundColor: color }}>
        <View style={styles.plantImageContainer}>
          <Image
            resizeMode="cover"
            style={styles.plantImage}
            source={{
              uri:
                (suggestionPlant?.img_object
                  ? suggestionPlant.img_object[0].img_url
                  : suggestionPlant.img_url[0]) ?? "",
            }}
          />
        </View>
        <View style={styles.plantInfoContainer}>
          <Text style={styles.plantName}>{suggestionPlant?.name}</Text>
          {suggestionPlant.status === "In Stock" ? (
            <Text style={styles.plantDescrip}>This item is in stock.</Text>
          ) : (
            <Text style={styles.plantDescrip}>
              We don't know when or if this item will be back in stock.
            </Text>
          )}
          <View>
            {availableDetail.map((item, key) => renderInfor(item, key))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext && handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#06492C" }}
            >
              <Text style={{ ...styles.buttonText, color: "white" }}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: WIDTH,
    height: HEIGHT * 0.28,
    paddingHorizontal: 24,
  },
  plantCard: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  plantImageContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  plantInfoContainer: {
    width: "70%",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  plantName: {
    color: "white",
    fontWeight: "regular",
    fontSize: 20,
  },
  plantDescrip: {
    color: "white",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  button: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: "black",
  },
});
