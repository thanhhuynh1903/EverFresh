import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import { formatPrice, normalizeString } from "../../utils/utils.js";
import { getPlants } from "../../api/plant.js";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.js";
import useCustomToast from "../../components/ToastNotification/ToastNotification.js";
import { useDispatch } from "react-redux";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk.js";
import { addToCart } from "../../api/cart.js";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function ShopPage() {
  const navigation = useNavigation();
  const showToast = useCustomToast();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const filterPlantList = useMemo(() => {
    const normalizedSearchValue = normalizeString(searchValue); // Normalize search value
    return plantList.filter((item) => {
      const normalizedName = normalizeString(item.name); // Normalize item name
      return normalizedName.includes(normalizedSearchValue); // Check if item name contains search value
    });
  }, [searchValue, plantList]);

  useFocusEffect(
    React.useCallback(() => {
      loadPlantList();
    }, [])
  );

  const loadPlantList = async () => {
    setLoading(true);
    const response = await getPlants();
    if (response?.status === 200) {
      setPlantList(response.data);
    }
    setLoading(false);
  };

  const handleAddToCart = async (item) => {
    const response = await addToCart(item._id);
    if (response.status === 201) {
      showToast({
        title: "Success",
        message: `Add plant to cart successfull`,
        type: "success",
      });
      await dispatch(getCartItemsThunk());
    } else {
      showToast({
        title: "SuFailccess",
        message: `Add plant to cart fail`,
        type: "error",
      });
    }
  };

  const renderTab = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => setTabIndex(key)}
        key={key}
      >
        <Text
          style={{
            ...styles.tabLabel,
            color: key === tabIndex ? "#0D986A" : "#002140",
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPlantCard = (item, key) => {
    if (!item) return;
    return (
      <TouchableOpacity
        style={styles.plantCard}
        onPress={() => navigation.navigate("PlantDetail", { plant: item })}
        key={key}
      >
        <ImageBackground
          source={
            item.background ||
            require("../../assets/shopping/Rectangle9CE5CB.png")
          }
          style={styles.plantCardBackground}
          resizeMode="contain"
        >
          <View style={styles.plantCardInfor}>
            <View style={styles.plantCardLabelContainer}>
              <Text style={styles.plantCardLabel}>{item.uses}</Text>
              <Image
                source={require("../../assets/shopping/pawIcon.png")}
                style={styles.plantCardLabelIcon}
              />
            </View>
            <Text numberOfLines={1} style={styles.plantCardName}>
              {item.name}
            </Text>
            <View style={styles.plantCardBottom}>
              <Text style={styles.plantCardPrice}>
                {formatPrice(item.price)} VNĐ
              </Text>
              <View style={styles.plantCardFeature}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/shopping/heartIcon.png")}
                    style={styles.plantCardFeatureIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleAddToCart(item);
                  }}
                >
                  <Image
                    source={require("../../assets/shopping/shopIcon.png")}
                    style={styles.plantCardFeatureIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.plantImageContainer}>
            <Image
              source={
                item.plantImage || require("../../assets/shopping/plant1.png")
              }
              style={styles.plantImage}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const tabList = [
    { label: "Top Pick" },
    { label: "Indoor" },
    { label: "Outdoor" },
    { label: "Seeds" },
    { label: "Planters" },
  ];

  return (
    <>
      <SafeAreaWrapper>
        <HomeHeader
          navigation={navigation}
          handleMenuToggle={() => setMenuVisible(!menuVisible)}
          backgroundColor={menuVisible && "#0B845C"}
        />
        <ScrollView style={styles.container}>
          <Image
            source={require("../../assets/shopping/headerImg.png")}
            style={styles.headerImg}
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
          <View style={styles.tabList}>
            {tabList.map((item, key) => renderTab(item, key))}
          </View>

          <View style={styles.plantListDefault}>
            {renderPlantCard(filterPlantList[0], 0)}
            {renderPlantCard(filterPlantList[1], 1)}
            <ImageBackground
              source={require("../../assets/shopping/inviteFriBackround.png")}
              style={styles.inviteFriContainer}
              resizeMode="contain"
            >
              <Text style={styles.inviteFriTitle}>
                Invite a Friend and earn Everfresh rewards
              </Text>
              <View style={styles.redeemLink}>
                <Text style={styles.redeemLinkText}>
                  Redeem them to get instant discounts
                </Text>
                <TouchableOpacity style={styles.redeemLinkButton}>
                  <Text style={styles.redeemLinkButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            {renderPlantCard(filterPlantList[2], 2)}
            {renderPlantCard(filterPlantList[3], 3)}
            <View style={styles.videoContainer}>
              <Image
                source={require("../../assets/shopping/video.png")}
                style={styles.videoImage}
              />
              <View style={styles.descriptionContainer}>
                <Text style={styles.videoText} numberOfLines={3}>
                  Caring for plants should be fun. That’s why we offer 1-on-1
                  virtual consultations from the comfort of your home or office.
                </Text>
                <TouchableOpacity style={styles.videoLearnMore}>
                  <View style={styles.videoDash} />
                  <Text style={styles.videoLearnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
            {renderPlantCard(filterPlantList[4], 4)}
            {renderPlantCard(filterPlantList[5], 5)}
          </View>
        </ScrollView>
        {loading && <SpinnerLoading />}
      </SafeAreaWrapper>
      <MenuModal
        visible={menuVisible}
        closeModal={() => setMenuVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 85,
  },
  headerImg: {
    height: WIDTH * 0.5,
    width: WIDTH * 0.95,
    marginHorizontal: WIDTH * 0.025,
    borderRadius: 14,
    marginTop: 12,
    resizeMode: "cover",
  },
  searchContainer: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    flexDirection: "row",
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
  // tabList
  tabList: {
    width: WIDTH,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  // tabContainer: {
  //     marginRight: 32
  // },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // plantCard
  plantCard: {
    width: WIDTH,
    height: WIDTH * 0.46,
    paddingHorizontal: WIDTH * 0.1,
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
  // inviteFriContainer
  inviteFriContainer: {
    width: WIDTH,
    height: WIDTH * 0.42,
    resizeMode: "cover",
    padding: 24,
    paddingTop: 32,
    paddingRight: WIDTH * 0.2,
  },
  inviteFriTitle: {
    fontSize: 24,
    fontWeight: "Bold",
    color: "#002140",
  },
  redeemLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 42,
    marginTop: 12,
  },
  redeemLinkText: {
    width: "45%",
    fontSize: 13,
    fontWeight: "Bold",
    color: "#0D986A",
  },
  redeemLinkButton: {
    padding: 12,
    paddingHorizontal: 32,
    backgroundColor: "#0D986A",
    borderRadius: 4,
  },
  redeemLinkButtonText: {
    fontSize: 13,
    fontWeight: "semibold",
    color: "white",
  },
  videoContainer: {
    width: WIDTH - 24,
    height: WIDTH * 0.51,
    marginHorizontal: 12,
    marginVertical: 12,
    marginBottom: 102,
  },
  videoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  descriptionContainer: {
    position: "relative",
    fontWeight: "medium",
    paddingHorizontal: 20,
    marginVertical: 12,
    flexDirection: "row",
  },
  videoText: {
    fontSize: 13,
  },
  videoLearnMore: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    bottom: -28,
    right: 16,
  },
  videoDash: {
    backgroundColor: "#0D986A",
    height: 1,
    width: 30,
    transform: [{ translateX: -6 }],
  },
});
