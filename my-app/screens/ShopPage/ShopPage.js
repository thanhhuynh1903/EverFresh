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
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import {
  formatPrice,
  getPlantIdListinGalery,
  normalizeString,
  successfulStatus,
} from "../../utils/utils.js";
import { getPlanters, getPlants, getSeeds } from "../../api/plant.js";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.js";
import useCustomToast from "../../components/ToastNotification/ToastNotification.js";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk.js";
import { addToCart } from "../../api/cart.js";
import CollectionListBottomSheet from "../../components/CollectionListBottomSheet/CollectionListBottomSheet.jsx";
import { useCollectionActions } from "../../utils/useCollectionAction.js";
import { selectGallery } from "../../redux/selector/selector.js";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function ShopPage() {
  const navigation = useNavigation();
  const showToast = useCustomToast();
  const dispatch = useDispatch();
  const galleryRedux = useSelector(selectGallery);
  const {
    handleAddToCollection,
    handleRemoveToCollection,
    handleChangeCollections,
  } = useCollectionActions();
  const [tabIndex, setTabIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [planterList, setPlanterList] = useState([]);
  const [seedList, setSeedList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [chooseCollectionVisible, setChooseCollectionVisible] = useState(false);

  const displayList = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return plantList;
      case 1:
        return planterList;
      case 2:
        return seedList;

      default:
        return plantList;
    }
  }, [plantList, planterList, seedList, tabIndex]);

  const filterPlantList = useMemo(() => {
    const normalizedSearchValue = normalizeString(searchValue); // Normalize search value
    return displayList.filter((item) => {
      const normalizedName = normalizeString(item.name); // Normalize item name
      return normalizedName.includes(normalizedSearchValue); // Check if item name contains search value
    });
  }, [searchValue, displayList]);

  const plantIdListinGalery = useMemo(() => {
    return getPlantIdListinGalery(galleryRedux.galleries);
  }, [galleryRedux]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    loadPlantList();
    loadPlanterList();
    loadSeedList();
  };

  const loadPlantList = async () => {
    setLoading(true);
    const response = await getPlants();
    if (response?.status === 200) {
      setPlantList(response.data);
    }
    setLoading(false);
  };

  const loadPlanterList = async () => {
    const response = await getPlanters();
    if (response?.status === 200) {
      setPlanterList(response.data);
    }
    setLoading(false);
  };

  const loadSeedList = async () => {
    const response = await getSeeds();
    if (response?.status === 200) {
      setSeedList(response.data);
    }
    setLoading(false);
  };

  const handleAddToCart = async (item) => {
    const data = {
      product_id: item._id,
      product_type:
        tabIndex === 0 ? "Plant" : tabIndex === 1 ? "Planter" : "Seed",
      custom_color: "#FFD2B6",
      quantity: 1,
    };
    const response = await addToCart(data);
    if (successfulStatus(response.status)) {
      showToast({
        title: "Success",
        message: `Add plant to cart successfull`,
        type: "success",
      });
      await dispatch(getCartItemsThunk());
    } else {
      showToast({
        title: "Fail",
        message: `Add plant to cart fail`,
        type: "error",
      });
      console.log(response?.response?.data);
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
    item.favorite = plantIdListinGalery.includes(item?._id);
    return (
      <TouchableOpacity
        style={styles.plantCard}
        onPress={() => {
          navigation.navigate("PlantDetail", { plant: item });
        }}
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
              <Text style={styles.plantCardLabel} numberOfLines={1}>
                {item.uses}
              </Text>
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
                <TouchableOpacity
                  onPress={() => {
                    item.favorite
                      ? handleRemoveToCollection(item)
                      : handleAddToCollection(item, setChooseCollectionVisible);
                  }}
                >
                  {item.favorite ? (
                    <Image
                      source={require("../../assets/shopping/heartIcon.png")}
                      resizeMode="cover"
                      style={styles.plantCardFeatureIcon}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/shopping/emptyHeartIcon.png")}
                      resizeMode="cover"
                      style={styles.plantCardFeatureIcon}
                    />
                  )}
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
                item?.img_url && item?.img_url[0]
                  ? { uri: item?.img_url[0] || "" }
                  : require("../../assets/cart/plant1.png")
              }
              resizeMode="cover"
              style={styles.plantImage}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderPlanterCard = (item, key) => {
    if (!item) return;
    item.favorite = plantIdListinGalery.includes(item?._id);
    return (
      <TouchableOpacity
        style={styles.plantCard}
        onPress={() => {
          navigation.navigate("PlanterDetail", { plant: item });
        }}
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
                <TouchableOpacity
                  onPress={() => {
                    item.favorite
                      ? handleRemoveToCollection(item)
                      : handleAddToCollection(item, setChooseCollectionVisible);
                  }}
                >
                  {item.favorite ? (
                    <Image
                      source={require("../../assets/shopping/heartIcon.png")}
                      resizeMode="cover"
                      style={styles.plantCardFeatureIcon}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/shopping/emptyHeartIcon.png")}
                      resizeMode="cover"
                      style={styles.plantCardFeatureIcon}
                    />
                  )}
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
                item?.img_object
                  ? { uri: item?.img_object[0]?.img_url || "" }
                  : require("../../assets/cart/plant1.png")
              }
              resizeMode="cover"
              style={styles.plantImage}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderItemList = (item, key) => {
    let additionalComponent = <></>;

    if (key == 1) {
      additionalComponent = (
        <ImageBackground
          source={require("../../assets/shopping/inviteFriBackround.png")}
          style={styles.inviteFriContainer}
          resizeMode="contain"
          key={`invite-${key}`} // Adding key for this component
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
      );
    }

    if (key == 3) {
      additionalComponent = (
        <View style={styles.videoContainer} key={`video-${key}`}>
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
      );
    }

    switch (tabIndex) {
      case 0:
        return (
          <React.Fragment key={`plant-${key}`}>
            {renderPlantCard(item, key)}
            {additionalComponent}
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment key={`planter-${key}`}>
            {renderPlanterCard(item, key)}
            {additionalComponent}
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment key={`plant-${key}`}>
            {renderPlantCard(item, key)}
            {additionalComponent}
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment key={`default-${key}`}>
            {renderPlantCard(item, key)}
            {additionalComponent}
          </React.Fragment>
        );
    }
  };

  const tabList = [
    { label: "Plant" },
    { label: "Planter" },
    { label: "Seeds" },
  ];

  return (
    <>
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
          {filterPlantList?.map((item, index) => renderItemList(item, index))}
        </View>
      </ScrollView>
      {loading && <SpinnerLoading />}
      <MenuModal
        visible={menuVisible}
        closeModal={() => setMenuVisible(false)}
      />
      <CollectionListBottomSheet
        visible={chooseCollectionVisible}
        onClose={() => setChooseCollectionVisible(false)}
        chooseCollection={(item) => handleChangeCollections(item)}
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
    justifyContent: "space-around",
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
    justifyContent: "center",
    alignItems: "center",
    right: "-20%",
  },
  plantImage: {
    position: "absolute",
    width: "70%",
    height: "60%",
    bottom: 0,
    borderRadius: 12,
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
