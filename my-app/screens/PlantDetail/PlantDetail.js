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
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import { formatPrice } from "../../utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { selectCart } from "../../redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../api/cart";
import useCustomToast from "../../components/ToastNotification/ToastNotification";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk";
// import { Tooltip, lightColors } from '@rneui/themed';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlantDetail({ route }) {
  const navigation = useNavigation();
  const cartRedux = useSelector(selectCart);
  const showToast = useCustomToast();
  const dispatch = useDispatch();
  const [plant, setPlant] = useState(route.params.plant || {});
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    cartViewVisible: false,
  });

  useEffect(() => {
    setPlant(route.params.plant);
  }, [route.params.plant]);

  const OverviewItems = useMemo(() => {
    return [
      {
        img: require("../../assets/plant details/drop.png"),
        value: "250ml",
        name: "Water",
      },
      {
        img: require("../../assets/plant details/sun.png"),
        value: "35-40%",
        name: "Light",
      },
      {
        img: require("../../assets/plant details/fertilizer.png"),
        value: "250gm",
        name: "Fertilizer",
      },
    ];
  }, [plant]);

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

  const renderOverviewItem = (item, key) => {
    return (
      <View style={styles.plantOverviewItem} key={key}>
        <Image
          // source={require('../../assets/plant details/drop.png')}
          source={item.img}
          resizeMode="stretch"
          style={styles.plantOverviewItemImage}
        />
        <View style={styles.plantOverviewItemDetail}>
          <Text style={styles.plantOverviewItemDetailValue}>{item.value}</Text>
          <Text style={styles.plantOverviewItemDetailName}>{item.name}</Text>
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
      <SafeAreaWrapper>
        <HomeHeader
          navigation={navigation}
          handleMenuToggle={() => setMenuVisible(!menuVisible)}
          backgroundColor={menuVisible && "#0B845C"}
        />
        <ScrollView style={styles.container}>
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
                    source={
                      plant.img_url[0] ||
                      require("../../assets/plant details/pawIcon.png")
                    }
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
                <Text style={styles.headerPlantNameText}>{plant.name}</Text>
              </View>
              <View style={styles.headerPlant}>
                <View style={styles.headerPlantPrice}>
                  <View style={styles.headerPlantInfo}>
                    <Text style={styles.headerPlantPriceTitle}>Price</Text>
                    <Text style={styles.headerPlantPriceText}>
                      {formatPrice(plant.price || 0)} VNĐ
                    </Text>
                  </View>
                  <View style={styles.headerPlantInfo}>
                    <Text style={styles.headerPlantPriceTitle}>Size</Text>
                    <Text style={styles.headerPlantPriceText}>
                      {plant.height || "Unknown"}
                    </Text>
                  </View>
                  <View
                    style={[styles.headerPlantFeature, styles.headerPlantInfo]}
                  >
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/shopping/heartIcon.png")}
                        style={styles.headerPlantFeatureIcon}
                      />
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
                  <View style={styles.headerPlantContainer}>
                    <Image
                      source={require("../../assets/plant details/plant1.png")}
                      style={styles.headerPlantImage}
                    />
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
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.plantOverview}>
            <Text style={styles.plantOverviewTitle}>Overview</Text>
            {OverviewItems.map((item, key) => renderOverviewItem(item, key))}
            <Text style={styles.plantOverviewTitle}>Plant Bio</Text>
            <Text style={styles.plantPlantBioDes}>
              No green thumb required to keep our artificial watermelon
              peperomia plant looking lively and lush anywhere you place it.
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.plantImageList}
          >
            {plantImageList.map((item, key) => renderPlantImage(item, key))}
          </ScrollView>
          <View style={styles.similarPlant}>
            <Text style={styles.plantOverviewTitle}>Similar Plants</Text>
            <ScrollView horizontal style={styles.similarPlantList}>
              {similarPlant.map((item, key) => renderSimilarPlant(item, key))}
            </ScrollView>
          </View>
          <View style={styles.verifyPlant}>
            <View style={styles.verifyPlantLeft}>
              <Text style={styles.verifyPlantLeftTitle}>That very plant?</Text>
              <Text style={styles.verifyPlantLeftDes}>
                Just Scan and the AI will know exactly
              </Text>
              <TouchableOpacity style={styles.verifyPlantLeftButton}>
                <Text style={styles.verifyPlantLeftButtonText}>Scan Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../assets/plant details/scanPlant.png")}
              resizeMode="contain"
              style={styles.verifyPlantImage}
            />
          </View>
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
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 20,
  },
  plantDetailHeader: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT * 0.42,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0)",
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
  },
  headerContentPlantType: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    gap: 24,
  },
  // headerPlantName
  headerPlantName: {
    width: "100%",
  },
  headerPlantNameText: {
    width: "60%",
    fontSize: 38,
    color: "#002140",
    fontWeight: "bold",
  },
  headerPlant: {
    width: "100%",
    height: "75%",
    overflow: "visible",
    transform: [{ translateY: -40 }],
  },
  headerPlantPrice: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  headerPlantInfo: {
    transform: [{ translateY: 40 }],
    marginTop: 24,
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
    transform: [{ translateY: 24 }],
  },
  headerPlantContainer: {
    position: "absolute",
    width: "70%",
    height: "100%",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerPlantImage: {
    width: "100%",
    height: "100%",
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
    paddingLeft: 32,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  plantOverviewTitle: {
    width: "100%",
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
    color: "#002140",
  },
  // plantImageList
  plantImageList: {
    width: WIDTH,
    flexDirection: "row",
    height: 90,
    marginTop: 16,
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
  verifyPlantLeftTitle: {
    fontSize: 20,
    color: "#002140",
    fontWeight: "bold",
    marginBottom: 8,
  },
  verifyPlantLeftDes: {
    fontSize: 14,
    color: "#002140",
    fontWeight: "medium",
    textAlign: "center",
    marginBottom: 16,
  },
  verifyPlantImage: {
    width: "60%",
    height: 180 - 24 * 2,
  },
  verifyPlantLeftButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#0D986A",
    borderRadius: 4,
  },
  verifyPlantLeftButtonText: {
    fontSize: 13,
    color: "#0D986A",
    fontWeight: "bold",
    textAlign: "center",
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
});
