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
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlantBookingCard({
  plant,
  onPress,
  hanldeIncrease,
  hanldeDecrease,
  hanldeDelete,
  handleAddToCollection,
}) {
  const [item, setItem] = useState(plant || {});

  useEffect(() => {
    setItem(plant);
  }, [plant]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress && onPress}>
      <Image
        source={item?.image || require("../../assets/cart/plant1.png")}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.center}>
        <View style={styles.centerFuncional}>
          <Text style={styles.centerTitle}>{item?.plantDetail?.name}</Text>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={handleAddToCollection && handleAddToCollection}
          >
            {!item?.bookmark && (
              <Text style={styles.centerStock}>In stock</Text>
            )}

            <Image
              source={
                item?.bookmark
                  ? require("../../assets/cart/bookMarkIconChecked.png")
                  : require("../../assets/cart/bookMarkIcon.png")
              }
              resizeMode="stretch"
              style={styles.bookMarkIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.centerFuncional}>
          <TouchableOpacity
            style={styles.funcionalButton}
            onPress={hanldeIncrease && hanldeIncrease}
          >
            <Icon name="plus" size={24} color="#002140" />
          </TouchableOpacity>
          <Text style={styles.amount}>{item?.quantity || 1}</Text>
          <TouchableOpacity
            style={styles.funcionalButton}
            onPress={hanldeDecrease && hanldeDecrease}
          >
            <Icon name="minus" size={24} color="#002140" />
          </TouchableOpacity>
          <TouchableOpacity onPress={hanldeDelete && hanldeDelete}>
            <Image
              source={require("../../assets/cart/bin.png")}
              resizeMode="stretch"
              style={styles.bookMarkIcon}
            />
          </TouchableOpacity>
          <Text style={styles.centerPrice}>
            {formatPrice(
              (item?.plantDetail?.price || 1) * (item?.quantity || 1)
            )}{" "}
            VNĐ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.1,
    width: "100%",
    overflow: "visible",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    // justifyContent: "space-between"
  },
  image: {
    width: "20%",
    height: "100%",
  },
  center: {
    width: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    padding: 12,
  },
  centerFuncional: {
    width: "100%",
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  funcionalButton: {
    borderWidth: 2,
    borderRadius: 8,
  },
  centerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#002140",
  },
  centerStock: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#DB8B00",
  },
  amount: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#0D986A",
  },
  centerPrice: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#002140",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
