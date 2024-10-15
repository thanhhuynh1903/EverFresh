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
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function PlantBookingCard({
  plant,
  type,
  onPress,
  hanldeIncrease,
  hanldeDecrease,
  handleDelete,
  handleAddToCollection,
}) {
  const [item, setItem] = useState(plant || {});

  useEffect(() => {
    setItem(plant);
  }, [plant]);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        marginBottom: type === "Plant" ? HEIGHT * 0.08 : 0,
      }}
      onPress={onPress && onPress}
    >
      <Image
        source={
          type === "Plant"
            ? item?.img_url && item?.img_url[0]
              ? { uri: item?.img_url[0] || "" }
              : require("../../assets/cart/plant1.png")
            : item?.img_object && item?.img_object[0]
            ? { uri: item?.img_object[0].img_url || "" }
            : require("../../assets/cart/plant1.png")
        }
        resizeMode="stretch"
        style={styles.image}
      />
      <View
        style={{
          ...styles.center,
        }}
      >
        <View style={styles.centerFuncional}>
          <Text style={styles.centerTitle}>{item?.name}</Text>
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
          <TouchableOpacity onPress={handleDelete && handleDelete}>
            <Image
              source={require("../../assets/cart/bin.png")}
              resizeMode="stretch"
              style={styles.bookMarkIcon}
            />
          </TouchableOpacity>
          <Text style={styles.centerPrice}>
            {formatPrice((item?.price || 1) * (item?.quantity || 1))} VNĐ
          </Text>
        </View>
        {type === "Plant" && (
          <View style={styles.planter}>
            <Text>+{item?.quantity} planter (accompanying gifts)</Text>
            <Image
              source={{
                uri: "https://cayxinh.vn/wp-content/uploads/2017/12/chau-gom-dat-nung-nau-2.jpg",
              }}
              style={styles.planterImage}
              resizeMode="stretch"
            />
          </View>
        )}
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
    marginBottom: 24,
    // justifyContent: "space-between"
  },
  image: {
    width: "20%",
    height: "100%",
  },
  center: {
    position: "relative",
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
  planter: {
    height: HEIGHT * 0.08,
    flexDirection: "row",
  },
  planterImage: {
    height: WIDTH * 0.08,
    width: WIDTH * 0.08,
    marginLeft: 8,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
