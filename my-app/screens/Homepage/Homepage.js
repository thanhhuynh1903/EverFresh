import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery, selectUser } from "../../redux/selector/selector";
import { getNotificationThunk } from "../../redux/thunk/notificationThunk";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const popularPlantCardDemo = [
  {
    status: "Fits well",
    name: "Happy David Rosemary",
    img: require("../../assets/homeImg/plant1.png"),
  },
  {
    status: "Fits well",
    name: "Lovely Gracie Betel grass",
    img: require("../../assets/homeImg/plant2.png"),
    textStroke: "",
  },
];

const guidePlantCardDemo = [
  {
    name: "Lily",
    img: require("../../assets/homeImg/guidePlant1.png"),
  },
  {
    name: "Common Yarrow",
    img: require("../../assets/homeImg/guidePlant2.png"),
  },
  {
    name: "Zinnia",
    img: require("../../assets/homeImg/guidePlant3.png"),
  },
];

const seasonalPlantCardDemo = [
  {
    description: "Summer plant less water required for growth",
    name: "Yarrow",
    img: require("../../assets/homeImg/seasonalPlant1.png"),
  },
  {
    description: "Winter plant minimum water required for growth",
    name: "Ageratum",
    img: require("../../assets/homeImg/seasonalPlant2.png"),
  },
  {
    description: "Winter plant minimum water required for growth",
    name: "Bacopa",
    img: require("../../assets/homeImg/seasonalPlant3.png"),
  },
];

export default function Homepage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const galleryRedux = useSelector(selectGallery);
  const userRedux = useSelector(selectUser);
  const [menuVisible, setMenuVisible] = useState(false);

  const renderPopularPlantCard = (item, key) => {
    return (
      <TouchableOpacity style={styles.popularPlantCard} key={key}>
        <View style={styles.popularPlantCardDetail}>
          <Text style={styles.popularPlantCardDetailStatus}>
            {item.status || "Fits well"}
          </Text>
          <Text style={styles.popularPlantCardDetailName}>
            {item.name || "Happy David Rosemary"}
          </Text>
        </View>
        <View style={styles.popularPlantCardImage}>
          <Image source={item.img} style={styles.popularPlantCardImagePlant} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSavedPlantCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.savedPlantCard}
        key={key}
        onPress={() => navigation.navigate("savedplant", { savedPlant: item })}
      >
        <Image
          source={{ uri: item?.img_url[0] || "" }}
          style={styles.savedPlantCardImage}
        />
      </TouchableOpacity>
    );
  };

  const renderGuidePlantCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.guidePlantCard}
        onPress={() => navigation.navigate("PlantGuide", { plant: item })}
        key={key}
      >
        <Image source={item.img} style={styles.guidePlantCardImage} />
        <Text style={styles.guidePlantCardText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeasonalPlantCard = (item, key) => {
    return (
      <TouchableOpacity style={styles.seasonalPlantCard} key={key}>
        <View style={styles.seasonalPlantCardImage}>
          <Image source={item.img} style={styles.seasonalPlantCardImagePlant} />
        </View>
        <View style={styles.seasonalPlantCardDetail}>
          <Text style={styles.seasonalPlantCardDetailnName}>
            {item.name || "Fits well"}
          </Text>
          <Text style={styles.seasonalPlantCardDetailDesc}>
            {item.description || "Happy David Rosemary"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View>
        <HomeHeader
          navigation={navigation}
          handleMenuToggle={() => setMenuVisible(!menuVisible)}
          backgroundColor={menuVisible && "#0B845C"}
        />
        <ScrollView style={styles.container}>
          <View style={styles.yourPland}>
            <Text style={styles.yourPlandTitle}>
              Hi{" "}
              <Text style={{ textTransform: "capitalize" }}>
                {userRedux?.user?.name || "User"}
              </Text>
              . Your plant missed you!
            </Text>
            <TouchableOpacity style={styles.yourPlandViewAll}>
              <Text style={styles.yourPlandViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularPlandContainer}>
            {popularPlantCardDemo.map((item, key) =>
              renderPopularPlantCard(item, item.name + key)
            )}
          </View>
          <View style={styles.popularPlandInfor}>
            <View style={styles.popularPlandInforRow}>
              <Icon
                name="tree-outline"
                size={18}
                color="rgba(59,206,172,0.75)"
              />
              <Text style={styles.popularPlandInforRowText}>
                Using 6 out 9 pods
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
          <View style={styles.deviderLine} />
          <View style={styles.yourPland}>
            <Text style={styles.yourPlandTitle}>Saved Plant</Text>
            <TouchableOpacity style={styles.yourPlandViewAll}>
              <Text style={styles.yourPlandViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.savedPlandContainer}>
            {galleryRedux?.plantList &&
              galleryRedux?.plantList
                .slice(0, 3)
                .map((item, key) => renderSavedPlantCard(item, key))}
          </View>
          <View style={styles.deviderLine} />
          <View style={styles.yourPland}>
            <Text style={styles.yourPlandTitle}>Plant guide</Text>
            <TouchableOpacity style={styles.yourPlandViewAll}>
              <Text style={styles.yourPlandViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.seasonalPlandContainer}
          >
            {guidePlantCardDemo.map((item, key) =>
              renderGuidePlantCard(item, item.name + key)
            )}
          </ScrollView>
          <View style={styles.yourPland}>
            <Text style={styles.yourPlandTitle}>Seasonal Plants</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              ...styles.seasonalPlandContainer,
              marginBottom: HEIGHT * 0.3,
            }}
          >
            {seasonalPlantCardDemo.map((item, key) =>
              renderSeasonalPlantCard(item, key)
            )}
          </ScrollView>
        </ScrollView>
      </View>
      <MenuModal
        visible={menuVisible}
        closeModal={() => {
          setMenuVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    backgroundColor: "white",
  },
  yourPland: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  yourPlandTitle: {
    width: "90%",
    fontSize: 18,
    fontWeight: "bold",
  },
  yourPlandViewAll: {
    textAlign: "right",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  yourPlandViewAllText: {
    textAlign: "right",
    fontSize: 12,
    color: "#0D986A",
    textDecorationLine: "underline",
  },
  // popilar plant
  popularPlandContainer: {
    width: WIDTH,
    flexDirection: "row",
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  popularPlantCard: {
    position: "relative",
    flexDirection: "row",
    width: "47.5%",
    height: 140,
    padding: 7.5,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 12,
    marginRight: "5%",
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // X: 0, Y: 4
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  popularPlantCardDetail: {
    width: "60%",
    justifyContent: "flex-end",
  },
  popularPlantCardDetailStatus: {
    color: "#61AF2B",
    fontWeight: "medium",
    fontSize: 10,
  },
  popularPlantCardDetailName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  popularPlantCardImage: {
    position: "relative",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  popularPlantCardImagePlant: {
    position: "absolute",
    left: -15,
  },
  //popular Pland Infor
  popularPlandInfor: {
    width: WIDTH - 20 * 2,
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 28,
    // borderWidth: 1,

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 8 }, // X: 0, Y: 4
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  popularPlandInforRow: {
    flexDirection: "row",
    gap: 12,
    height: 25,
  },
  popularPlandInforRowText: {
    color: "#06492C",
    fontSize: 14,
  },
  deviderLine: {
    width: WIDTH - 20 * 2,
    height: 1,
    backgroundColor: "#D9D9D9",
    marginBottom: 28,
    marginHorizontal: 20,
  },
  // saved pland
  savedPlandContainer: {
    width: WIDTH - 2 * 15,
    marginHorizontal: 15,
    marginBottom: 28,
    flexDirection: "row",
    // justifyContent: "space-between",
    // gap: "5%",
  },
  savedPlantCard: {
    width: WIDTH * 0.28,
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
    height: WIDTH * 0.28,
    resizeMode: "contain",
  },
  // guidePlantCard
  guidePlantCard: {
    flexDirection: "row",
    width: WIDTH * 0.4,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    gap: 14,

    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // X: 0, Y: 4
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 4,
  },
  guidePlantCardImage: {
    width: "30%",
    height: HEIGHT * 0.08,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  guidePlantCardText: {
    width: "70%",
    fontSize: 18,
    fontWeight: "bold",
  },
  //seasonalPlantCard
  seasonalPlandContainer: {
    width: WIDTH - 2 * 15,
    marginHorizontal: 15,
    marginBottom: 28,
    flexDirection: "row",
    overflow: "visible",
  },
  seasonalPlantCard: {
    width: WIDTH * 0.4,
    padding: 6,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 6,

    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(218,218,218,0)",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, // X: 0, Y: 4
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 4,
  },
  seasonalPlantCardImage: {
    width: "100%",
    marginBottom: 10,
  },
  seasonalPlantCardImagePlant: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  seasonalPlantCardDetailnName: {
    color: "#002140",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seasonalPlantCardDetailDesc: {
    color: "#002140",
    fontSize: 12,
  },
});
