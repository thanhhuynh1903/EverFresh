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
import React, { useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../../utils/utils";
import { updateNewestOrder } from "../../api/order";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function OrderComplete({ route }) {
  const navigation = useNavigation();

  const handleNavigate = async (naviFunction) => {
    naviFunction;
    await updateNewestOrder();
  };

  return (
    <View style={styles.container}>
      <View style={styles.congratuContainer}>
        <Image
          source={require("../../assets/utilsImage/congratu.png")}
          resizeMode="stretch"
          style={styles.congratuImage}
        />
        <Text style={styles.congratuTitle}>Order completed!</Text>
        <Text style={styles.orderNumber}>Order number: #9876543</Text>
      </View>
      <View style={styles.orderDetail}>
        <Text style={styles.orderDetailTitle}>Ordered Items</Text>

        <View style={styles.paymentDetail}>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={styles.paymentDetailTitle}>Order</Text>
            <Text style={styles.paymentDetailText}>
              {formatPrice(
                route?.params?.order?.total_price -
                  route?.params?.order?.delivery_method?.price
              )}{" "}
              VNĐ
            </Text>
          </View>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={styles.paymentDetailTitle}>Delivery</Text>
            <Text style={styles.paymentDetailText}>
              {formatPrice(route?.params?.order?.delivery_method?.price)} VNĐ
            </Text>
          </View>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={{ ...styles.paymentDetailTitle, fontSize: 16 }}>
              Summary
            </Text>
            <Text style={{ ...styles.paymentDetailText, fontSize: 16 }}>
              {formatPrice(route?.params?.order?.total_price)} VNĐ
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => {
          handleNavigate(navigation.navigate("homepage"));
        }}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.proceedButton,
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#0D986A",
        }}
        onPress={() => {
          handleNavigate(
            navigation.navigate("TrackingOrder", {
              orderDetail: route.params.order || {},
            })
          );
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#0D986A" }}>
          Order Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 100,
    backgroundColor: "#FFFFFF",
    zIndex: 11,
  },
  congratuContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  congratuImage: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.2,
  },
  congratuTitle: {
    fontSize: 22,
    fontWeight: "regular",
    color: "#9FC78A",
    marginTop: 24,
  },
  orderNumber: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#BBBBBB",
  },
  // paymentDetail
  paymentDetail: {
    marginHorizontal: 28,
    marginVertical: 32,
    gap: 12,
  },
  paymentDetailTitle: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#3E3E3E",
  },
  paymentDetailText: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#3E3E3E",
  },
  // proceedButton
  proceedButton: {
    // width: "WIDTH",
    marginHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: "#0D986A",
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  orderDetailTitle: {
    width: WIDTH,
    padding: 28,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "medium",
    color: "#424347",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F5F5F5",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
