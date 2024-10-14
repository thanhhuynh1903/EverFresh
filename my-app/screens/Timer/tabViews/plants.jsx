import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const plantList = [
  {
    name: "David",
    plantType: "Herb",
    harvestIn: 3,
    plantIn: 8,
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/david.png?alt=media&token=1020176d-b0ce-4c36-9031-215efd373a16",
  },
  {
    name: "Gracie",
    plantType: "Herb",
    harvestIn: 10,
    plantIn: 5,
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/Gracie.png?alt=media&token=184d5923-9a48-4662-be02-4051ed185d98",
  },
  {
    name: "Maven",
    plantType: "Herb",
    harvestIn: 5,
    plantIn: 1,
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/Maven.png?alt=media&token=25b7cf56-79cc-4e36-a20c-0a4e2a61e3a1",
  },
  {
    name: "Oregano",
    plantType: "Herb",
    harvestIn: 3,
    plantIn: 8,
    img_url:
      "https://firebasestorage.googleapis.com/v0/b/everfresh-a5e2f.appspot.com/o/Oregano.png?alt=media&token=cbae6e70-241d-4e88-8473-ae9dcf410a6e",
  },
];

const Plants = () => {
  const renderGrowingPlantCard = (plant, key) => {
    return (
      <View
        style={{
          ...styles.flexRow,
          ...styles.growingPlantCard,
          justifyContent: "space-between",
        }}
        key={key}
      >
        <View
          style={{
            ...styles.flexRow,
            justifyContent: "space-between",
            width: "45%",
            height: "100%",
          }}
        >
          <Image
            style={styles.growingPlantCardImage}
            source={{ uri: plant.img_url || "" }}
            resizeMode="contain"
          />
          <View>
            <View style={{ ...styles.flexRow, gap: 4 }}>
              <Text style={styles.growingPlantCardName}>{plant.name}</Text>
              <Icon name="information" size={18} color="rgba(12,147,89,0.75)" />
            </View>
            <Text style={styles.growingPlantCardType}>{plant.plantType}</Text>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.growingPlantCardHarvestTime}>
            Harvest in {plant.harvestIn} days
          </Text>
          <Text style={styles.growingPlantCardPlantedTime}>
            Planted {plant.plantIn === 1 ? "yesterday" : plant.plantIn} days ago{" "}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.popularPlandInfor}>
        <View style={styles.popularPlandInforRow}>
          <Icon name="tree-outline" size={18} color="rgba(59,206,172,0.75)" />
          <Text style={styles.popularPlandInforRowText}>
            Using 6 out of 9 pods
          </Text>
        </View>
        <View style={styles.popularPlandInforRow}>
          <Icon
            name="clock-time-two-outline"
            size={18}
            color="rgba(59,206,172,0.75)"
          />
          <Text style={styles.popularPlandInforRowText}>
            Basil will be ready for harvest in 3 days
          </Text>
        </View>
      </View>
      <View style={styles.growingPlandContainer}>
        <View style={[styles.growingPlandContainerHeader, styles.flexRow]}>
          <Icon name="flower-outline" size={18} color="rgba(6,73,44,0.75)" />
          <Text style={styles.growingPlandContainerHeaderText}>
            Growing now
          </Text>
        </View>
        {plantList.map((item, key) => renderGrowingPlantCard(item, key))}
      </View>
    </>
  );
};

export default Plants;

const styles = StyleSheet.create({
  popularPlandInfor: {
    width: "100%",
    height: "auto",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    // borderWidth: 1,

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  popularPlandInforRow: {
    flexDirection: "row",
    gap: 12,
    height: 25,
  },
  popularPlandInforRowText: {
    color: "#06492C",
    fontWeight: "bold",
    fontSize: 14,
  },
  deviderLine: {
    width: WIDTH - 20 * 2,
    height: 1,
    backgroundColor: "#D9D9D9",
    marginBottom: 28,
    marginHorizontal: 20,
  },

  //   GrowingPlantCard
  growingPlandContainer: {
    width: "100%",
    height: "auto",
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
    // borderWidth: 1,

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  growingPlandContainerHeader: {
    backgroundColor: "rgba(12,147,89,0.05)",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    gap: 12,
  },
  growingPlandContainerHeaderText: {
    fontWeight: "regular",
    fontSize: 14,
    color: "rgba(6,73,44,0.75)",
  },
  growingPlantCard: {
    height: HEIGHT * 0.1,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(6,73,44,0.1)",
  },
  growingPlantCardImage: {
    height: "100%",
    aspectRatio: 1,
  },
  growingPlantCardName: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#06492C",
  },
  growingPlantCardType: {
    fontWeight: "regular",
    fontSize: 14,
    color: "rgba(6,73,44,0.5)",
  },
  growingPlantCardHarvestTime: {
    fontWeight: "regular",
    fontSize: 14,
    color: "rgba(6,73,44,0.75)",
  },
  growingPlantCardPlantedTime: {
    fontWeight: "regular",
    fontSize: 14,
    color: "rgba(6,73,44,0.5)",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
