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
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const savedPlantTypes = ["Indoor", "Pet friendly", "Papaveraceae"];

const savedPlantCardDemo = [
  {
    img: require("../../assets/homeImg/plantImage1.png"),
  },
  {
    img: require("../../assets/homeImg/plantImage2.png"),
  },
  {
    img: require("../../assets/homeImg/plantImage3.png"),
  },
];

export default function SavedPlant({ route }) {
  const navigation = useNavigation();
  const [savedPlant, setSavedPlant] = useState(route.params.savedPlant);
  const [descriptionReadmore, setDescriptionReadmore] = useState(false);

  const renderPlantType = (item, key) => {
    return (
      // <View style={styles.plantTypeCard} >
      <Text style={styles.plantTypeName} key={key}>
        {item}
      </Text>
      // </View>
    );
  };

  const savedPlantNeeded = [
    {
      name: "Height",
      value: savedPlant.height,
      icon: require("../../assets/savedPlant/Ruler.png"),
      backgroundColor: "#EEF7E8",
      color: "#4B8364",
    },
    {
      name: "Water",
      value: savedPlant.water,
      icon: require("../../assets/savedPlant/Vector.png"),
      backgroundColor: "#E6EAFA",
      color: "#7C95E4",
    },
    {
      name: "Light",
      value: savedPlant.light,
      icon: require("../../assets/savedPlant/Sun.png"),
      backgroundColor: "#FCF1E3",
      color: "#E6B44C",
    },
    {
      name: "Humidity",
      value: savedPlant.humidity,
      icon: require("../../assets/savedPlant/Temprature.png"),
      backgroundColor: "#F8E8F8",
      color: "#C390E6",
    },
  ];

  const renderSavedPlantCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.savedPlantCard}
        key={key}
        onPress={() => navigation.navigate("savedplant", { savedPlant: item })}
      >
        <Image source={item.img} style={styles.savedPlantCardImage} />
      </TouchableOpacity>
    );
  };

  const renderPlantNeeded = (item, key) => {
    return (
      <View
        style={{
          ...styles.plantNeedCard,
          paddingLeft: key % 2 === 0 ? 0 : "5%",
        }}
        key={key}
      >
        <View
          style={{
            ...styles.plantNeedLeft,
            backgroundColor: item.backgroundColor,
          }}
        >
          <Image source={item?.icon} style={styles.plantNeedImage} />
        </View>
        <View style={styles.plantNeedRight}>
          <Text style={{ ...styles.plantNeedName, color: item.color }}>
            {item.name}
          </Text>
          <Text style={styles.plantNeedValue}>{item.value}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../assets/savedPlant/savedBackground.png")} // Change this to your image path
        style={styles.savedPlantHeader}
        resizeMode="cover"
      >
        <View style={styles.savedPlantHeaderTop}>
          <TouchableOpacity
            style={styles.savedPlantHeaderBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.savedPlantHeaderTittle}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.savedPlantHeaderTittle}>Saved plant</Text>
        </View>
        <View style={styles.savedPlantHeaderBottom}>
          <Image
            // source={savedPlant?.img}
            source={{ uri: savedPlant?.img_url[0] }}
            style={styles.savedPlantHeaderImage}
          />
        </View>
      </ImageBackground>
      <View style={styles.plantTitle}>
        <Text style={styles.plantTitleName}>{savedPlant.name}</Text>
        <Text style={styles.plantTitleFullName}>{savedPlant.sub_name}</Text>
      </View>
      <View style={styles.plantType}>
        {savedPlant?.uses
          ?.split(", ")
          ?.map((item) => item.trim())
          .map((item, key) => renderPlantType(item, item + key))}
      </View>
      <View style={styles.savedPlantbody}>
        <View style={styles.savedPlantDescription}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionCre}>
            From Wikipedia, the free encyclopedia
          </Text>
          <Text
            style={styles.descriptionDetail}
            numberOfLines={descriptionReadmore ? 0 : 5}
          >
            {savedPlant.describe}
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.descriptionReadmore}
              onPress={() => setDescriptionReadmore(!descriptionReadmore)}
            >
              {!descriptionReadmore ? "Read more" : "Hidden"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.savedPlantNeeded}>
          {savedPlantNeeded.map((item, key) => renderPlantNeeded(item, key))}
        </View>
        <Text style={styles.savedPlantImage}>
          Pictures of {savedPlant.name}
        </Text>
        <View style={styles.savedPlandContainer}>
          {savedPlantCardDemo.map((item, key) =>
            renderSavedPlantCard(item, key)
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    // marginBottom: 100,
    backgroundColor: "#FFFFFF",
  },
  savedPlantHeader: {
    paddingVertical: 20,
  },
  savedPlantHeaderTop: {
    width: WIDTH,
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#666666",
  },
  savedPlantHeaderBack: {
    position: "absolute",
    left: 20,
    paddingVertical: 10,
  },
  savedPlantHeaderTittle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  savedPlantHeaderBottom: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 30,
  },
  savedPlantHeaderImage: {
    width: WIDTH * 0.5,
    height: WIDTH * 0.5,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "rgba(256,256,256,0.5)",
    borderRadius: 8,

    backgroundColor: "rgba(256,256,256,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, // X: 0, Y: 4
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 8,
  },
  // title
  plantTitle: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  plantTitleName: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  plantTitleFullName: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#0D986A",
    textTransform: "capitalize",
  },
  // plantType
  plantType: {
    width: WIDTH,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  plantTypeName: {
    color: "#696969",
    fontWeight: "medium",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    margin: 8,
    backgroundColor: "#F0F3F6",
  },
  // savedPlantbody
  savedPlantbody: {
    paddingHorizontal: 18,
  },
  savedPlantDescription: {
    gap: 8,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  descriptionCre: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#8C8C8C",
  },
  descriptionDetail: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#515151",
  },
  descriptionReadmore: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
    transform: [{ translateY: -6 }],
    textAlign: "right",
  },
  // savedPlantNeeded
  savedPlantNeeded: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  plantNeedCard: {
    width: "50%",
    flexDirection: "row",
    marginBottom: 12,
  },
  plantNeedLeft: {
    width: 58,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  plantNeedRight: {
    paddingLeft: 12,
  },
  plantNeedName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  plantNeedValue: {
    fontSize: 18,
    fontWeight: "medium",
    width: "60%",
  },
  savedPlantImage: {
    fontSize: 20,
    fontWeight: "medium",
    textAlign: "center",
    marginBottom: 12,
  },
  // savedPland
  savedPlandContainer: {
    width: "100%",
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  savedPlantCard: {
    width: WIDTH * 0.26,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  savedPlantCardImage: {
    width: "100%",
    height: WIDTH * 0.26,
    resizeMode: "contain",
  },
});
