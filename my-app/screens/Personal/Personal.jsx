import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery, selectUser } from "../../redux/selector/selector";
import { getNotificationThunk } from "../../redux/thunk/notificationThunk";
import Photos from "./tabViews/photos";
import Products from "./tabViews/products";
import Reviews from "./tabViews/reviews";
import { successfulStatus } from "../../utils/utils";
import { paymentStripeUprank } from "../../api/payment";
import LogoCorner from "../../components/logo-corner";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const FirstRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Photos />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Products />
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Reviews />
  </ScrollView>
);

export default function Personal() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const galleryRedux = useSelector(selectGallery);
  const userRedux = useSelector(selectUser);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [routes] = useState([
    { key: "plants", title: "Photos" },
    { key: "log", title: "Products" },
    { key: "settings", title: "Reviews" },
  ]);

  const renderScene = SceneMap({
    plants: FirstRoute,
    log: SecondRoute,
    settings: ThirdRoute,
  });

  const [editButtonWidth, setEditButtonWidth] = useState(0);

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setEditButtonWidth(width);
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
          {route.title}
        </Text>
      )}
    />
  );

  const paymentPremium = async () => {
    const response = await paymentStripeUprank();
    if (successfulStatus(response.status)) {
      console.log(response?.data);
      await Linking.openURL(response?.data?.url);
    }
  };

  return (
    <>
      <View>
        <HomeHeader
          navigation={navigation}
          handleMenuToggle={() => setMenuVisible(!menuVisible)}
          backgroundColor={menuVisible && "#0B845C"}
        />
        <ScrollView
          style={styles.container}
          nestedScrollEnabled={true}
          stickyHeaderIndices={[userRedux?.user?.rank !== "Premium" ? 3 : 2]}
        >
          <View style={styles.profileHeader}>
            <Image
              source={require("../../assets/utilsImage/personalBackfround.png")}
              resizeMode="contain"
              style={styles.profileBackgroundImage}
            />
            <View style={styles.profileAvt}>
              <Image
                source={{ uri: userRedux?.user?.avatar_url || "" }}
                resizeMode="contain"
                style={styles.profileAvtImage}
              />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <View
              style={{
                position: "relative",
                overflow: "visible",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.profileInfoName}>
                {userRedux?.user?.name}
              </Text>
              <TouchableOpacity
                style={[
                  styles.profileInfoEdit,
                  { transform: [{ translateX: editButtonWidth + 10 }] },
                ]}
                onPress={() => navigation.navigate("EditProfile")}
                onLayout={handleLayout}
              >
                <Text style={styles.profileInfoEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.profileInfoDetail}>Expert in planting</Text>
            <View style={styles.flexRow}>
              <Icon name="map-marker" size={20} color="#544C4C" />
              <Text style={styles.profileInfoDetail}>
                {userRedux?.user?.country}
              </Text>
            </View>
          </View>
          {userRedux?.user?.rank !== "Premium" && (
            <View
              style={{
                ...styles.flexCol,
                justifyContent: "space-between",
                padding: 10,
                paddingVertical: 10,
                borderRadius: 6,
                margin: 20,
                marginVertical: 10,
                backgroundColor: "white",

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <LogoCorner />
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>Experience exciting features only available at Everfresh</Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#009E71",
                  borderRadius: 4,
                  marginTop: 5
                }}
                onPress={paymentPremium}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Purchasing Now!</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.tabViewContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
              initialLayout={{ width: WIDTH }}
            />
          </View>
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
    // overflow: "visible",
    backgroundColor: "white",
  },

  profileHeader: {
    position: "relative",
    alignItems: "center",
    marginBottom: WIDTH * 0.2,
  },
  profileAvt: {
    position: "absolute",
    width: WIDTH * 0.38,
    height: WIDTH * 0.38,
    bottom: 0,
    transform: [{ translateY: WIDTH * 0.175 }],
  },
  profileAvtImage: {
    width: "100%",
    height: "100%",
    borderRadius: 500,
  },
  profileInfo: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    gap: 4,
  },
  profileInfoName: {
    width: "100%",
    color: "#242760",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileInfoEdit: {
    position: "absolute",
    right: 0,
    backgroundColor: "#009E71",
    height: "100%",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 12,
  },
  profileInfoEditText: {
    color: "white",
  },
  profileInfoDetail: {
    color: "#544C4C",
    fontWeight: "semibold",
    fontSize: 13,
  },
  tabViewContainer: {
    height: HEIGHT, // Set the height to fit the screen
    backgroundColor: "#fff",
  },

  // tabBar
  tabBar: {
    width: WIDTH * 0.9,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    margin: 10,
    marginHorizontal: WIDTH * 0.05,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    // paddingHorizontal: 5,
    justifyContent: "center",
  },
  indicatorStyle: {
    backgroundColor: "#009E71",
    height: "90%",
    width: "32.5%",
    marginVertical: "5%",
    marginHorizontal: "0.833333333%",
    borderRadius: 12,
  },
  tabLabel: {
    color: "#88B797",
    fontSize: 16,
    fontWeight: "600",
  },
  tabLabelFocused: {
    color: "white",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexCol: {
    flexDirection: "col",
    alignItems: "center",
  }
});
