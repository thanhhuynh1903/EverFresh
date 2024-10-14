import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import BottomSheetHeader from "../../components/BottomSheetHeader/BottomSheetHeader";
import { selectGallery } from "../../redux/selector/selector";
import { getCollections } from "../../api/collection";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import { normalizeString } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Galery() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const galleryRedux = useSelector(selectGallery);
  const [plantList, setPlantList] = useState(galleryRedux.plantList || []);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setPlantList(galleryRedux.plantList);
  }, [galleryRedux.plantList]);

  const renderImage = (item, key) => {
    return (
      <TouchableOpacity
        key={key}
        style={styles.imageContainer}
        onPress={() => navigation.navigate("PlantGuide", { plant: item })}
      >
        <Image
          style={styles.image}
          source={{ uri: item.img_url[0] || "" }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const filterPlantList = useMemo(() => {
    const normalizedSearchValue = normalizeString(searchValue); // Normalize search value
    return plantList.filter((item) => {
      const normalizedName = normalizeString(item.name); // Normalize item name
      return normalizedName.includes(normalizedSearchValue); // Check if item name contains search value
    });
  }, [searchValue, plantList]);

  return (
    <View>
      <BottomSheetHeader
        goback={() => {
          navigation.goBack();
        }}
        title={"Your Galery"}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image
            source={require("../../assets/shopping/searchIcon.png")}
            style={styles.searchInputIcon}
          />
          <TextInput
            style={styles.searchInputField}
            placeholder="Search"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <Image
            source={require("../../assets/shopping/QRScanIcon.png")}
            style={styles.searchInputIcon}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={require("../../assets/shopping/FilterIcon.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.plantListContainer}>
          {filterPlantList.map((item, key) => renderImage(item, key))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "white",
  },
  plantListContainer: {
    width: WIDTH,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
  },
  imageContainer: {
    width: WIDTH * 0.3,
    height: WIDTH * 0.3,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    aspectRatio: 1,
  },

  searchContainer: {
    width: WIDTH,
    paddingHorizontal: WIDTH * 0.05,
    flexDirection: "row",
    backgroundColor: "white",
  },
  searchInputContainer: {
    width: WIDTH * 0.75,
    height: WIDTH * 0.12,
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#002140",
    marginRight: WIDTH * 0.03,
    marginVertical: 12,
    alignItems: "center",
  },
  filterButton: {
    width: WIDTH * 0.12,
    height: WIDTH * 0.12,
    padding: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#002140",
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputIcon: {
    width: WIDTH * 0.05,
    height: WIDTH * 0.05,
  },
  searchInputField: {
    width: WIDTH * 0.59,
    height: WIDTH * 0.12,
    paddingHorizontal: 15,
  },
});
