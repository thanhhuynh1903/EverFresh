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
  Animated,
  Easing,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import {
  formatPrice,
  getPlantIdListinGalery,
  successfulStatus,
} from "../../utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { selectCart, selectGallery } from "../../redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getSuggestionPlanter } from "../../api/cart";
import useCustomToast from "../../components/ToastNotification/ToastNotification";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk";
import ChangeColorWheel from "./ChangeColorWheel";
import CollectionListBottomSheet from "../../components/CollectionListBottomSheet/CollectionListBottomSheet";
import { useCollectionActions } from "../../utils/useCollectionAction";
import AvailableInfomation from "./AvailableInfomation";
import About from "./About";
import PlantSuggestion from "../../components/Suggestion/PlantSuggestion";
// import { Tooltip, lightColors } from '@rneui/themed';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlanterDetail({ route }) {
  const navigation = useNavigation();
  const cartRedux = useSelector(selectCart);
  const galleryRedux = useSelector(selectGallery);
  const showToast = useCustomToast();
  const dispatch = useDispatch();
  const {
    handleAddToCollection,
    handleRemoveToCollection,
    handleChangeCollections,
  } = useCollectionActions();
  const [plant, setPlant] = useState(route.params.plant || {});
  const [suggestionPlanter, setSuggestionPlanter] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [colorChangerVisible, setColorChangerVisible] = useState(false);
  const [chooseCollectionVisible, setChooseCollectionVisible] = useState(false);
  const [choosedPlanterIndex, setChoosedPlanterIndex] = useState(0);

  const scrollViewRef = useRef(null);
  const cardWidth = Dimensions.get("window").width; // Calculate card width

  const scrollToNext = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (index + 1) * cardWidth, // Scroll to the right by the width of one card
        animated: true,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setChooseCollectionVisible(false);
    }, [])
  );

  useEffect(() => {
    setPlant({
      ...route.params.plant,
      favorite: plantIdListinGalery.includes(route.params.plant?._id),
    });
    loadSuggestion();
    setColorChangerVisible(false);
  }, [route.params.plant, galleryRedux.galleries]);

  const loadSuggestion = async () => {
    const response = await getSuggestionPlanter();
    if (successfulStatus(response.status)) {
      setSuggestionPlanter(response.data);
    }
  };

  const plantIdListinGalery = useMemo(() => {
    return getPlantIdListinGalery(galleryRedux.galleries);
  }, [galleryRedux]);

  const handleAddToCart = async (item) => {
    const data = {
      product_id: item._id,
      product_type: "Planter",
      custom_color: "#FFD2B6",
      quantity: 1,
    };

    const response = await addToCart(data);
    if (response.status === 201) {
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
    }
  };

  const renderTooltipView = () => {
    return (
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipPlantName}>Grant Earthenware bowl</Text>
        <View style={styles.tooltipPlantInfo}>
          <Text style={styles.tooltipPlantInfoTitle}>Size</Text>
          <Text style={styles.tooltipPlantInfoValue}>4”</Text>
        </View>
        <View style={styles.tooltipPlantInfo}>
          <Text style={styles.tooltipPlantInfoTitle}>Drainage</Text>
          <Text style={styles.tooltipPlantInfoValue}>no hole</Text>
        </View>
        <View style={styles.tooltipPlantInfo}>
          <Text style={styles.tooltipPlantInfoTitle}>MATERIAL</Text>
          <Text style={styles.tooltipPlantInfoValue}>Ceramic</Text>
        </View>
      </View>
    );
  };

  const renderPlantImage = (item, key) => {
    return (
      <Image
        // source={require('../../assets/plant details/drop.png')}
        source={item}
        resizeMode="stretch"
        style={styles.plantListImage}
        key={key}
      />
    );
  };

  const renderSimilarPlant = (item, key) => {
    return (
      <View
        style={{
          ...styles.similarPlantCard,
          backgroundColor: key % 2 === 0 ? "#9CE5CB" : "#E5F0A1",
        }}
        key={key}
      >
        <Image
          // source={require('../../assets/plant details/drop.png')}
          source={item.img}
          resizeMode="contain"
          style={styles.similarPlantCardImage}
        />
        <Image
          source={require("../../assets/plant details/heartIcon.png")}
          resizeMode="stretch"
          style={styles.similarPlantCardFavoriteImage}
        />
        <View style={styles.similarPlantCardTop}>
          <Text style={styles.similarPlantCardTopLabel}>Air Purifier</Text>
          <Image
            source={require("../../assets/plant details/pawIcon.png")}
            style={styles.similarPlantCardTopIcon}
          />
        </View>
        <View style={styles.similarPlantCardDetail}>
          <Text style={styles.similarPlantCardDetailName}>{item.name}</Text>
          <Text style={styles.similarPlantCardDetailValue}>
            {formatPrice(item.value)} VNĐ
          </Text>
        </View>
      </View>
    );
  };

  const renderChangeColor = () => {
    return (
      <TouchableOpacity
        style={styles.unionImageContainer}
        onPress={() => {
          setColorChangerVisible(true);
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={require("../../assets/utilsImage/Union.png")}
        />
      </TouchableOpacity>
    );
  };

  const similarPlant = [
    {
      img: require("../../assets/plant details/plant1.png"),
      value: "200000",
      name: "Peperomia",
    },
    {
      img: require("../../assets/plant details/plant5.png"),
      value: "125000",
      name: "Cactus",
    },
  ];

  const plantImageList = [
    require("../../assets/plant details/video.png"),
    require("../../assets/plant details/plantImage1.png"),
    require("../../assets/plant details/plantImage2.png"),
    require("../../assets/plant details/plantImage3.png"),
  ];

  return (
    <>
      <HomeHeader
        navigation={navigation}
        handleMenuToggle={() => setMenuVisible(!menuVisible)}
        backgroundColor={menuVisible && "#0B845C"}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.plantDetailHeader}>
          <Image
            source={require("../../assets/plant details/headerBackground.png")} // Change this to your image path
            resizeMode="stretch"
            style={styles.plantDetailHeaderBackground}
          />
          <View style={styles.plantDetailHeaderContent}>
            <View style={styles.headerContentPlantType}>
              <View style={styles.plantTypeLeft}>
                <Text style={styles.plantTypeLabel}>
                  {plant.uses || "Air Purifier"}
                </Text>
                <Image
                  source={require("../../assets/plant details/pawIcon.png")}
                  style={styles.plantTypeLabelIcon}
                />
              </View>
              <View style={styles.plantTypeRight}>
                <Image
                  source={require("../../assets/plant details/star.png")}
                  style={styles.plantTypeLabelIcon}
                />
                <Text style={styles.plantTypeRate}>
                  {plant.average_rating || "0"}
                </Text>
              </View>
            </View>
            <View style={styles.headerPlantName}>
              <Text style={styles.headerPlantNameText} numberOfLines={2}>
                {plant.name}
              </Text>
            </View>
            <View style={styles.headerPlant}>
              <View style={styles.headerPlantPrice}>
                {!colorChangerVisible && (
                  <>
                    <View style={styles.headerPlantInfo}>
                      <Text style={styles.headerPlantPriceTitle}>Price</Text>
                      <Text style={styles.headerPlantPriceText}>
                        {formatPrice(plant.price || 0)} VNĐ
                      </Text>
                    </View>
                    <View style={styles.headerPlantInfo}>
                      <Text style={styles.headerPlantPriceTitle}>Size</Text>
                      <Text style={styles.headerPlantPriceText}>
                        {plant.size || "Unknown"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.headerPlantFeature,
                        styles.headerPlantInfo,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          plant.favorite
                            ? handleRemoveToCollection(plant)
                            : handleAddToCollection(
                                plant,
                                setChooseCollectionVisible
                              );
                        }}
                      >
                        {plant.favorite ? (
                          <Image
                            source={require("../../assets/shopping/heartIcon.png")}
                            resizeMode="cover"
                            style={styles.headerPlantFeatureIcon}
                          />
                        ) : (
                          <Image
                            source={require("../../assets/shopping/emptyHeartIcon.png")}
                            resizeMode="cover"
                            style={styles.headerPlantFeatureIcon}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleAddToCart(plant);
                        }}
                      >
                        <Image
                          source={require("../../assets/shopping/shopIcon.png")}
                          style={styles.headerPlantFeatureIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <View
                  style={[
                    styles.headerPlantContainer,
                    colorChangerVisible && styles.headerPlantOnlyContainer,
                  ]}
                >
                  <Image
                    source={
                      plant?.img_object &&
                      plant?.img_object[choosedPlanterIndex]
                        ? {
                            uri:
                              plant?.img_object[choosedPlanterIndex]?.img_url ||
                              "",
                          }
                        : require("../../assets/cart/plant1.png")
                    }
                    resizeMode="cover"
                    style={styles.headerPlantImage}
                  />
                  {!colorChangerVisible && (
                    <View style={styles.headerPlantDetailTooltip}>
                      <View
                        style={{
                          position: "relative",
                          alignSelf: "center",
                          alignItems: "center",
                          backgroundColor: "#FFFFFF",
                          shadowColor: "#000",
                          shadowOffset: { width: 4, height: 4 }, // X: 0, Y: 4
                          shadowOpacity: 0.25,
                          shadowRadius: 50,
                          elevation: 8,
                          borderRadius: 12,
                        }}
                      >
                        {renderTooltipView()}
                        <View style={styles.tooltipArrow} />
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.changeColorContainer,
                  colorChangerVisible && styles.changeColorVisible,
                ]}
              >
                {!colorChangerVisible ? (
                  renderChangeColor()
                ) : (
                  <ChangeColorWheel
                    defaultPlanterList={plant?.img_object}
                    defaultColor={plant?.default_color}
                    choosedPlanterIndex={choosedPlanterIndex}
                    setChoosedPlanterIndex={setChoosedPlanterIndex}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Image List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={styles.plantImageList}
        >
          {plantImageList.map((item, key) => renderPlantImage(item, key))}
        </ScrollView>

        <View style={styles.divider} />
        {/* introduction */}
        <View style={styles.plantOverview}>
          <Text style={styles.plantOverviewTitle}>Introduction</Text>
          <Text style={styles.plantPlantBioDes}>{plant?.describe}</Text>
        </View>
        <View style={styles.divider} />
        {/* rating */}
        <View style={{ ...styles.plantOverview, height: HEIGHT * 0.1 }}>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={styles.plantOverviewTitle}>Rating</Text>
            <Text style={styles.reviewAmount}>47 Reviews</Text>
          </View>
          <View style={styles.starList}>
            <View style={styles.starItem}>
              <Icon
                name="star-outline"
                size={WIDTH * 0.1}
                color="#000"
                style={styles.iconBorder}
              />
              {/* Inner Star (filled) */}
              <Icon
                name="star"
                size={WIDTH * 0.1 * 0.9}
                color="#FFEEA3"
                style={styles.iconFill}
              />
            </View>
            <View style={styles.starItem}>
              <Icon
                name="star-outline"
                size={WIDTH * 0.1}
                color="#000"
                style={styles.iconBorder}
              />
              {/* Inner Star (filled) */}
              <Icon
                name="star"
                size={WIDTH * 0.1 * 0.9}
                color="#FFEEA3"
                style={styles.iconFill}
              />
            </View>
            <View style={styles.starItem}>
              <Icon
                name="star-outline"
                size={WIDTH * 0.1}
                color="#000"
                style={styles.iconBorder}
              />
              {/* Inner Star (filled) */}
              <Icon
                name="star"
                size={WIDTH * 0.1 * 0.9}
                color="#FFEEA3"
                style={styles.iconFill}
              />
            </View>
            <View style={styles.starItem}>
              <Icon
                name="star-outline"
                size={WIDTH * 0.1}
                color="#000"
                style={styles.iconBorder}
              />
              {/* Inner Star (filled) */}
              <Icon
                name="star"
                size={WIDTH * 0.1 * 0.9}
                color="#FFEEA3"
                style={styles.iconFill}
              />
            </View>
            <View style={styles.starItem}>
              <Icon
                name="star-outline"
                size={WIDTH * 0.1}
                color="#000"
                style={styles.iconBorder}
              />
              {/* Inner Star (filled) */}
              <Icon
                name="star"
                size={WIDTH * 0.1 * 0.9}
                color="#FFEEA3"
                style={styles.iconFill}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Available */}
        <AvailableInfomation
          planter={plant}
          color={plant?.img_object[choosedPlanterIndex]?.color}
        />
        <View style={styles.divider} />
        {/* About this item */}
        <About />
        <View style={styles.divider} />
        {/* Product description */}

        {/* suggestion */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.suggestionList}
          horizontal
          nestedScrollEnabled={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {suggestionPlanter.map((item, key) => (
            <PlantSuggestion
              plant={item}
              key={key}
              handleNext={() => scrollToNext(key)}
            />
          ))}
        </ScrollView>
      </ScrollView>
      {cartRedux?.cartList[0].total_price !== 0 && (
        <LinearGradient
          colors={["#0B845C", "#0D986A"]} // Set the gradient colors
          start={{ x: 1, y: 0 }} // Start from the right
          end={{ x: 0, y: 0 }} // End at the left
          style={styles.bottomCartSheet}
        >
          <TouchableOpacity
            style={styles.bottomCartSheetContainer}
            onPress={() => navigation.navigate("CartView")}
          >
            <View style={styles.bottomCartSheetContainerLeft}>
              <Image
                source={require("../../assets/plant details/shopIcon.png")}
                resizeMode="contain"
                style={styles.bottomCartSheetContainerLeftImage}
              />
              <Text style={styles.bottomCartSheetContainerLeftCartAmount}>
                View {cartRedux?.cartList[0].list_cart_item_id?.length} items
              </Text>
            </View>
            <Text style={styles.bottomCartSheetContainerRight}>
              {formatPrice(cartRedux?.cartList[0].total_price)} VNĐ
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
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
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 20,
  },
  plantDetailHeader: {
    position: "relative",
    width: WIDTH,
    // height: HEIGHT * 0.42,
    // minHeight: HEIGHT * 0.42,
  },
  plantDetailHeaderBackground: {
    width: WIDTH,
    height: HEIGHT * 0.4,
    overflow: "visible",
  },
  plantDetailHeaderContent: {
    position: "absolute",
    overflow: "visible",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    paddingRight: 0,
  },
  headerContentPlantType: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  plantTypeLeft: {
    flexDirection: "row",
    gap: 24,
  },
  plantTypeLabel: {
    fontSize: 14,
    color: "#002140",
    fontWeight: "bold",
  },
  plantTypeRate: {
    fontSize: 12,
    color: "#0D986A",
    fontWeight: "semibold",
  },
  plantTypeRight: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginRight: 18,
    gap: 24,
  },
  // headerPlantName
  headerPlantName: {
    width: "100%",
    zIndex: 10,
  },
  headerPlantNameText: {
    width: "60%",
    fontSize: 35,
    color: "#002140",
    fontWeight: "bold",
    zIndex: 10,
  },
  headerPlant: {
    position: "relative",
    width: "100%",
    height: "75%",
    overflow: "visible",
    transform: [{ translateY: -40 }],
    zIndex: 1,
  },

  // change color contaienr
  changeColorContainer: {
    position: "absolute",
    width: "10%",
    right: 0,
    top: 0,
    bottom: 0,
  },
  changeColorVisible: {
    right: "40%",
    bottom: "-100%",
  },
  unionImageContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    top: "20%",
    zIndex: 999,
  },

  // changingWheel
  changingWheel: {
    width: WIDTH * 1.2,
    height: "100%",
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#203901",
    borderRadius: 500,
    position: "relative",
  },
  pot: {
    width: WIDTH * 0.1,
    height: WIDTH * 0.1,
    position: "absolute",
    bottom: "0%",
  },

  headerPlantPrice: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  headerPlantInfo: {
    transform: [{ translateY: 40 }],
    marginTop: 24,
    zIndex: 10,
  },
  headerPlantPriceTitle: {
    textTransform: "uppercase",
    fontSize: 12,
    color: "#002140",
    fontWeight: "bold",
  },
  headerPlantPriceText: {
    fontSize: 16,
    color: "#002140",
    fontWeight: "bold",
  },
  headerPlantFeature: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginLeft: "10%",
  },
  headerPlantFeatureIcon: {
    transform: [{ translateY: 0 }],
  },
  headerPlantContainer: {
    position: "absolute",
    width: "70%",
    height: HEIGHT * 0.3,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerPlantOnlyContainer: {
    position: "static",
    width: "40%",
    marginTop: "10%",
  },
  headerPlantImage: {
    width: "80%",
    height: "80%",
    borderRadius: 12,
  },
  headerPlantDetailTooltip: {
    position: "absolute",
    width: 190,
    bottom: "-15%",
  },
  tooltipArrow: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#ffffff",
    top: -10,
    transform: [{ rotateZ: "45deg" }],
  },
  // tooltipContainer
  tooltipContainer: {
    padding: 12,
    gap: 8,
  },
  tooltipPlantName: {
    fontSize: 14,
    color: "#002140",
    fontWeight: "bold",
  },
  tooltipPlantInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooltipPlantInfoTitle: {
    width: "50%",
    textTransform: "uppercase",
    fontSize: 10,
    color: "#333333",
    fontWeight: "semibold",
  },
  tooltipPlantInfoValue: {
    width: "50%",
    textTransform: "uppercase",
    fontSize: 10,
    color: "#002140",
    fontWeight: "semibold",
  },
  // plantOverview
  plantOverview: {
    width: WIDTH,
    paddingHorizontal: 18,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallPlantOverview: {
    width: WIDTH * 0.3,
  },
  plantOverviewTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#002140",
    marginVertical: 12,
  },
  plantOverviewItem: {
    width: "33%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  smallPlantOverviewItem: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 24,
  },
  plantOverviewItemDetail: {},
  plantOverviewItemDetailValue: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#0D986A",
  },
  plantOverviewItemDetailName: {
    fontSize: 10,
    fontWeight: "semibold",
    color: "#002140",
  },
  plantPlantBioDes: {
    width: "90%",
    fontSize: 15,
    fontWeight: "regular",
    color: "#979797",
  },
  // plantImageList
  plantImageList: {
    width: WIDTH,
    flexDirection: "row",
    height: 90,
    marginTop: 28,
    paddingHorizontal: 18,
  },
  plantListImage: {
    height: "100%",
    marginLeft: 16,
  },
  // similarPlant
  similarPlant: {
    width: WIDTH,
    paddingLeft: 32,
    marginBottom: 24,
    overflow: "visible",
  },
  similarPlantList: {
    width: WIDTH,
    overflow: "visible",
  },
  similarPlantCard: {
    position: "relative",
    width: WIDTH * 0.35,
    height: 110,
    padding: 12,
    borderRadius: 24,
    marginRight: WIDTH * 0.15,
    overflow: "visible",
  },
  similarPlantCardImage: {
    position: "absolute",
    // height: WIDTH * 0.3,
    height: "100%",
    width: WIDTH * 0.3,
    right: "-45%",
    // top: "-20%"
  },
  similarPlantCardFavoriteImage: {
    position: "absolute",
    // height: WIDTH * 0.3,
    right: "22%",
    bottom: "20%",
  },
  similarPlantCardTop: {
    flexDirection: "row",
    gap: 12,
  },
  similarPlantCardTopLabel: {
    fontSize: 12,
    color: "#002140",
    fontWeight: "regular",
  },
  similarPlantCardDetail: {
    gap: 18,
  },
  similarPlantCardDetailName: {
    fontSize: 20,
    color: "#002140",
    fontWeight: "bold",
  },
  similarPlantCardDetailValue: {
    fontSize: 15,
    color: "#002140",
    fontWeight: "bold",
  },
  // verifyPlant
  verifyPlant: {
    height: 180,
    padding: 24,
    marginHorizontal: 32,
    backgroundColor: "#F5EDA8",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verifyPlantLeft: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  // bottomCartSheet
  bottomCartSheet: {
    width: "100%",
    flexDirection: "row",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomCartSheetContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingHorizontal: 36,
  },
  bottomCartSheetContainerLeft: {
    flexDirection: "row",
    gap: 24,
  },
  bottomCartSheetContainerLeftCartAmount: {
    color: "#FFFFFF",
    opacity: 0.7,
  },
  bottomCartSheetContainerRight: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "semibold",
  },
  suggestionList: {
    width: WIDTH,
    marginRight: WIDTH * 0.5,
    marginVertical: 12,
  },

  reviewAmount: {
    color: "#979797",
    textDecorationLine: "underline",
  },

  flexRow: {
    width: "100%",
    flexDirection: "row",
  },
  divider: {
    width: "90%",
    height: 2,
    marginHorizontal: "5%",
    marginTop: 12,
    backgroundColor: "black",
  },

  starList: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  starItem: {
    width: "15%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  iconBorder: {
    position: "absolute",
  },
  iconFill: {
    position: "absolute",
  },
});
