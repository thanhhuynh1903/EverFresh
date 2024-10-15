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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const plantInfo = [
  {
    title: "Plant Height",
    info: "1 to 3 feet",
  },
  {
    title: "Plant Width",
    info: "1 to 3 feet",
  },
  {
    title: "Zones",
    info: "10, 3, 4, 5, 6, 7, 8, 9",
  },
  {
    title: "Uses",
    info: "Containers, Ground Covers",
  },
  {
    title: "Tolerance",
    info: "Drought Tolerant",
  },
  {
    title: "Bloom Time",
    info: "Early Summer, Summer",
  },
  {
    title: "Light",
    info: "Full Sun",
  },
  {
    title: "Moisture",
    info: "Medium Moisture",
  },
  {
    title: "Maintenance",
    info: "Moderate",
  },
  {
    title: "Growth Rate",
    info: "Moderate",
  },
  {
    title: "Plant Type",
    info: "Perennials",
  },
  {
    title: "Plant Seasonal Interest",
    info: "Summer Interest",
  },
  {
    title: "Flower Color",
    info: "Yellow",
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

export default function PlantGuide({ route }) {
  const [plant, setPlant] = useState(route.params.plant);

  const navigation = useNavigation();

  useEffect(() => {
    setPlant(route.params.plant);
  }, [route.params.plant]);

  const renderInfoCard = (item, key) => {
    return (
      <View style={styles.plantInforCard} key={key}>
        <Text style={styles.plantInforCardTitle}>{item.title}:</Text>
        <Text style={styles.plantInforCardInfo}>{item.info}</Text>
      </View>
    );
  };

  const renderSeasonalPlantCard = (item, key) => {
    return (
      <TouchableOpacity style={styles.seasonalPlantCard} key={key}>
        <View style={styles.seasonalPlantCardImage}>
          <Image
            source={item.uri ? { uri: item.img } : item.img}
            style={styles.seasonalPlantCardImagePlant}
          />
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
      <View style={{ ...styles.header, backgroundColor: "white" }}>
        <TouchableOpacity style={styles.iconstyle} onPress={navigation.goBack}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <View style={styles.fetureList}>
          <Text style={styles.title}>Plant Guide</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.plantDetail}>
          <Text style={styles.plantDetailTitle}>
            {plant?.name || "‘Banana Boat’ daylily"}
          </Text>
          <Text style={styles.plantDetailName}>Hemerocallis ‘Banana Boat’</Text>
          <Text style={styles.plantDetailClass}>hem-er-oh-KAL-iss</Text>
          <Image
            source={
              plant?.uri && plant.img_url
                ? { uri: plant.img_url[0] }
                : require("../../assets/utilsImage/plantGuideImage.png")
            }
            resizeMode="cover"
            style={styles.plantDetailImage}
          />
        </View>
        <View style={styles.plantInforList}>
          <View style={styles.plantInforCard}>
            <Text style={styles.plantInforCardTitle}>Genus:</Text>
            <Text
              style={{
                ...styles.plantInforCardInfo,
                color: "#0C9553",
                textDecorationLine: "underline",
              }}
            >
              Hemerocallis
            </Text>
          </View>
          {plantInfo.map((item, key) => renderInfoCard(item, key))}
          <Text style={styles.plantDescription}>
            Daylilies are classic, extremely popular garden plants. They feature
            long, arching, strappy leaves and long stems of generally 6-petaled
            flowers, though double flowers are popular as well. Each flower
            lasts only one day, hence the plant’s common name. Daylilies come in
            a wide range of colors, from cream and cheery yellow to peach,
            orange, fiery red, deep burgundy, pink, and purple. Some have
            contrasting throats and “eye-zones.” Daylilies are ideal for a mixed
            herbaceous perennial border.
          </Text>
          <Text style={styles.plantDescriptionTitle}>
            Noteworthy Characteristics
          </Text>
          <Text style={styles.plantDescription}>
            This cultivar has pale yellow flowers with ruffled edges It has a
            diurnal blooming habit; its blooms remain open from the early
            morning until the evening. Each flower lasts for only one day.
          </Text>
          <Text style={styles.plantDescriptionTitle}>Care</Text>
          <Text style={styles.plantDescription}>
            Daylilies are basically sun lovers. They bloom admirably in six
            hours of sun and will make do with less, but in the North, the more
            sun they get, the better. In the South, though, they appreciate
            protection at midday and do best under a high canopy of light shade.
            While daylilies will grow in ordinary garden soil and are not fussy
            about pH, they perform magnificently in soils that have been
            generously amended with organic matter—compost, rotted leaves, or
            well-aged manure. Moisture is the other key to growing really
            spectacular daylilies. Although their plump storage roots keep them
            going in times of drought and guarantee survival, an abundance of
            water makes all the difference to the quality and quantity of the
            flowers. Try to provide at least an inch of water a week in the
            North, more in the South. Mulching plants with shredded leaves or
            other light organic matter goes a long way toward ensuring moisture
            retention.
          </Text>
          <Text style={styles.plantDescriptionTitle}>Propagation</Text>
          <Text style={styles.plantDescription}>
            Sow seed in containers in spring or autumn. The easiest method is to
            divide in spring or autumn.
          </Text>
          <Text style={styles.plantDescriptionTitle}>Problems</Text>
          <Text style={styles.plantDescription}>
            Daylilies are strong plants and relatively pest and disease
            resistant. Some minor damage from sucking insects like aphids and
            thrips. Slugs and snails may damage young leaves. Rust is possible.
          </Text>
          <View style={styles.yourPland}>
            <Text style={styles.yourPlandTitle}>Related Plants</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.seasonalPlandContainer}
          >
            {seasonalPlantCardDemo.map((item, key) =>
              renderSeasonalPlantCard(item, key)
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: HEIGHT * 0.08,
    backgroundColor: "#FFFFFF",
  },
  plantDetail: {
    justifyContent: "center",
    gap: 12,
  },
  plantDetailTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "regular",
  },
  plantDetailName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "regular",
  },
  plantDetailClass: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "regular",
    color: "#0C9553",
  },
  plantDetailImage: {
    width: WIDTH * 0.7,
    height: WIDTH * 0.5,
    marginHorizontal: WIDTH * 0.15,
    borderRadius: 12,
  },
  yourPland: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginVertical: 16,
  },
  yourPlandTitle: {
    width: "75%",
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

  plantInforList: {
    paddingHorizontal: 18,
    marginVertical: 24,
  },
  plantInforCard: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plantInforCardTitle: {
    fontWeight: "bold",
  },

  header: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT * 0.05,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",

    shadowColor: "rgba(0,0,0,0.1)", // Black color
    shadowOffset: { width: 0, height: -4 }, // X: 0, Y: -4
    shadowOpacity: 0.1, // 10% opacity
    shadowRadius: 14, // Blur: 14
    elevation: 3,
  },
  iconstyle: {
    position: "absolute",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.045,
    resizeMode: "contain",
    left: "10%",
    bottom: 5,
    fontSize: 17,
    color: "#0D986A",
    fontWeight: "regular",
  },
  backButton: {
    fontSize: 17,
    color: "#0D986A",
    fontWeight: "regular",
  },
  fetureList: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: HEIGHT * 0.05,
    gap: 12,
    marginRight: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  plantDescriptionTitle: {
    fontSize: 18,
    fontWeight: "regular",
    color: "#0A673A",
    marginVertical: 12,
  },
  plantDescription: {
    fontSize: 16,
    fontWeight: "regular",
    textAlign: "justify",
  },

  seasonalPlandContainer: {
    width: WIDTH - 2 * 15,
    // marginHorizontal: 15,
    marginBottom: 28,
    flexDirection: "row",
    overflow: "visible",
  },
  seasonalPlantCard: {
    width: WIDTH * 0.4,
    padding: 6,
    borderRadius: 8,
    marginVertical: 6,
    marginRight: 12,

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

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
