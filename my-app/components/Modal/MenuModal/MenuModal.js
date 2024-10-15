import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Philosopher_400Regular,
} from "@expo-google-fonts/philosopher";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const tabList = [
  {
    name: "shop",
    icon: require("../../../assets/menu/shop.png"),
    page: "ShopPage",
  },
  {
    name: "plant care",
    icon: require("../../../assets/menu/care.png"),
    // page: "ShopPage",
  },
  {
    name: "community",
    icon: require("../../../assets/menu/community.png"),
    // page: "ShopPage",
  },
  {
    name: "my account",
    icon: require("../../../assets/menu/account.png"),
    // page: "ShopPage",
  },
  {
    name: "my orders",
    icon: require("../../../assets/menu/order.png"),
    page: "OrderList",
  },
];

export default function MenuModal({ visible, closeModal }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Philosopher_400Regular,
  });
  const dispatch = useDispatch();

  // Prevent splash screen auto-hide until fonts are loaded
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen?.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  }

  const renderTab = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.tabCard}
        onPress={() => {
          if (item.page) {
            closeModal(), navigation.navigate(item.page);
          }
        }}
        key={key}
      >
        <View style={styles.tabIcon}>
          <Image source={item.icon} />
        </View>
        <Text style={styles.tabName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handeLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("Welcome");
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      style={styles.container}
    >
      {/* <ScrollView > */}
      <LinearGradient
        colors={["#0B845C", "#0D986A"]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.backgroundImage}>
          <Image
            source={require("../../../assets/menu/img1.png")}
            style={styles.img1}
          />
          <Image
            source={require("../../../assets/menu/img2.png")}
            style={styles.img2}
          />
          <Image
            source={require("../../../assets/menu/img3.png")}
            style={styles.img3}
          />
          <Image
            source={require("../../../assets/menu/img4.png")}
            style={styles.img4}
          />
        </View>
        <View style={styles.closeModal}>
          <TouchableOpacity onPress={closeModal}>
            <Image
              source={require("../../../assets/menu/close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          {tabList.map((item, key) => renderTab(item, key))}

          <TouchableOpacity
            style={styles.tabCard}
            onPress={() => {
              closeModal(), navigation.navigate("CartView");
            }}
          >
            <View style={styles.tabIcon}>
              <Icon
                name="cart-outline"
                size={28}
                color="rgba(256,256,256,0.7)"
              />
            </View>
            <Text style={styles.tabName}>cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabCard}
            onPress={() => {
              closeModal(), handeLogout();
            }}
          >
            <View style={styles.tabIcon}>
              <Icon name="logout" size={28} color="rgba(256,256,256,0.7)" />
            </View>
            <Text style={styles.tabName}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.getDirtContainer}>
          <Text style={styles.getDirtTitle}>Get the dirt.</Text>
          <View style={styles.getDirtInput}>
            <TextInput
              style={styles.getDirtInputField}
              placeholder="Enter your Email"
              placeholderTextColor={"#FFFFFF"}
            />
          </View>
        </View>
        <View style={styles.modalBottomContainer}>
          <TouchableOpacity style={styles.modalBottomTab}>
            <Text style={styles.modalBottomTabText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBottomTab}>
            <Text style={styles.modalBottomTabText}>About US</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBottomTab}>
            <Text style={styles.modalBottomTabText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* </ScrollView> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 100,
  },
  // closebutton
  closeModal: {
    width: "100%",
    padding: "10%",
    paddingBottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  tabContainer: {
    width: "100%",
    paddingHorizontal: "27.5%",
    gap: 28,
  },
  tabCard: {
    flexDirection: "row",
  },
  tabIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "17.5%",
  },
  tabName: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
    textTransform: "capitalize",
  },
  // getDirtContainer
  getDirtContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  getDirtTitle: {
    fontFamily: "Philosopher_400Regular",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  getDirtInput: {
    height: 60,
    width: "70%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginTop: 12,
  },
  getDirtInputField: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: "white",
  },
  // modalBottomContainer
  modalBottomContainer: {
    width: "100",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  modalBottomTabText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "white",
  },
  // backgroundImage
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  img1: {
    position: "absolute",
    top: "-24%",
    right: "20%",
    height: "50%",
    resizeMode: "contain",
  },
  img2: {
    position: "absolute",
    top: "24%",
    right: "25%",
    height: "30%",
    resizeMode: "contain",
  },
  img3: {
    position: "absolute",
    top: "13%",
    left: "12%",
    height: "30%",
    resizeMode: "contain",
  },
  img4: {
    position: "absolute",
    bottom: "-15%",
    left: "0%",
    height: "55%",
    resizeMode: "contain",
  },
});
