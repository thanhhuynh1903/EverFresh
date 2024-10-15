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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OrderStatusBar from "../../components/OrderStatusBar/OrderStatusBar";
import { formatDate, formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const savePlantList = [
  {
    image: require("../../assets/cart/plant2.png"),
    name: "Watermelon Peperomia",
    price: 170000,
    bookmark: true,
  },
  {
    image: require("../../assets/cart/plant1.png"),
    name: "Peperomia Obtusfolia",
    price: 200000,
    bookmark: true,
  },
  {
    image: require("../../assets/cart/plant5.png"),
    name: "Cactus",
    price: 170000,
    bookmark: true,
  },
];

export default function TrackingOrder({ route }) {
  const navigation = useNavigation();

  const [orderDetail, setOrderDetail] = useState(route.params.orderDetail);
  const orderStatusList = useMemo(() => {
    return [
      {
        name: "Order Confirmed",
        date: formatDate(orderDetail.createdAt),
        checked: [
          "Confirmed",
          "Shipped",
          "Out Of Delivery",
          "Delivered",
        ].includes(orderDetail.status),
      },
      {
        name: "Shipped",
        date: formatDate(orderDetail?.tracking_status_dates[0]?.value || ""),
        checked: ["Shipped", "Out Of Delivery", "Delivered"].includes(
          orderDetail.status
        ),
      },
      {
        name: "Out For Delivery",
        date: formatDate(orderDetail?.tracking_status_dates[1]?.value || ""),
        checked: ["Out Of Delivery", "Delivered"].includes(orderDetail.status),
      },
      {
        name: "Delivered ",
        date: formatDate(orderDetail?.tracking_status_dates[2]?.value || ""),
        checked: ["Delivered"].includes(orderDetail.status),
      },
    ];
  }, [orderDetail]);

  useEffect(() => {
    setOrderDetail(route.params.orderDetail);
  }, [route.params.orderDetail]);

  const renderBookingCard = (item, key, type) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.bookingCardContainer,
          marginBottom: type === "Plant" ? HEIGHT * 0.08 : 0,
        }}
        activeOpacity={1}
        onPress={item?.onPress && item?.onPress}
        key={key}
      >
        {console.log(item)}
        <View style={styles.imageContainer}>
          <Image
            source={
              item?.img_url[0]
                ? {
                    uri: item?.img_url[0] || "",
                  }
                :
              require("../../assets/cart/plant1.png")
            }
            resizeMode="stretch"
            style={styles.image}
          />
        </View>

        <View style={styles.center}>
          <View style={styles.centerFuncional}>
            <Text style={styles.centerTitle}>{item?.name}</Text>
            <Text style={styles.centerPrice}>
              {formatPrice(item?.price || 0)} VNĐ
            </Text>
          </View>
          <View
            style={{ ...styles.centerFuncional, justifyContent: "flex-start" }}
          >
            <Text style={styles.amount}>{item?.uses}</Text>
            <View style={styles.split} />
            <Text style={styles.amount}>{item?.growth_rate}</Text>
            <View style={styles.split} />
            <Text style={styles.amount}>35 cm</Text>
            <Text
              style={{
                ...styles.amount,
                bottom: 0,
                right: 0,
              }}
            >
              Oty: {item?.quantity}
            </Text>
          </View>
          {type === "Plant" && (
            <View style={styles.planter}>
              <Text style={styles.textPlanter}>
                +{item?.quantity} planter (accompanying gifts)
              </Text>
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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: "white" }}>
        <Text style={styles.orderCode}>Order {orderDetail._id}</Text>
      </View>
      <View style={styles.orderContainer}>
        <View style={styles.orderTime}>
          <Text style={styles.orderTimeTitle}>Order date:</Text>
          <Text style={styles.orderTimeValue}>
            {formatDate(orderDetail.createdAt)}
          </Text>
          <Image
            source={require("../../assets/cart/deliveryIcon.png")}
            resizeMode="stretch"
            style={styles.deliveryIcon}
          />
          <Text style={styles.orderTimeExpDate}>
            Estimated delivery: {formatDate(orderDetail.updatedAt)}
          </Text>
        </View>
        <View style={styles.orderStatusBar}>
          {orderDetail.status === "Failed Delivery" ? (
            <Text>Failed Delivery</Text>
          ) : (
            <OrderStatusBar orderStatusList={orderStatusList} />
          )}
        </View>
        <View style={styles.dashLine} />
        {orderDetail?.list_cart_item_id?.map((item, key) =>
          renderBookingCard(item.product, key, item.product_type)
        )}
        <View style={styles.dashLine} />
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoTab}>
            <Text style={styles.orderInfoTabTitle}>Payment</Text>
            <View style={styles.flexRow}>
              <Text style={styles.orderInfoTabText}>
                {orderDetail?.payment_method === "MOMO"
                  ? orderDetail?.payment_method
                  : "VISA"}
              </Text>
              <Image
                source={
                  orderDetail?.payment_method === "MOMO"
                    ? require("../../assets/utilsImage/card-1.png")
                    : require("../../assets/utilsImage/Payment method icon.png")
                }
                resizeMode="contain"
                style={styles.orderMethodImage}
              />
            </View>
          </View>
          <View style={styles.orderInfoTab}>
            <Text style={styles.orderInfoTabTitle}>Delivery</Text>
            <Text style={styles.orderInfoTabText}>Address</Text>
            <Text
              style={{
                ...styles.orderInfoTabText,
                fontWeight: "medium",
                fontSize: 12,
              }}
            >
              {orderDetail?.delivery_information?.address}{" "}
              {orderDetail?.delivery_information?.address_detail}
              {/* Thuong Huyen - 0979084700 B10-12, chung cu 9View So 1, duong So 1,
              PLB, TP.TD, TP.HCM */}
            </Text>
          </View>
        </View>
        <View style={styles.dashLine} />
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoTab}>
            <Text style={styles.orderInfoTabTitle}>Need Help</Text>
            <View style={{ ...styles.flexRow, gap: 4 }}>
              <Image
                source={require("../../assets/utilsImage/info-circle.png")}
              />
              <Text style={styles.orderInfoTabText}>Order Issues</Text>
              <Image
                source={require("../../assets/utilsImage/VectorArrow.png")}
              />
            </View>
            <View style={{ ...styles.flexRow, gap: 4 }}>
              <Image
                source={require("../../assets/utilsImage/truck-time.png")}
              />
              <Text style={styles.orderInfoTabText}>Delivery Info</Text>
              <Image
                source={require("../../assets/utilsImage/VectorArrow.png")}
              />
            </View>
            <View style={{ ...styles.flexRow, gap: 4 }}>
              <Image
                source={require("../../assets/utilsImage/box-remove.png")}
              />
              <Text style={styles.orderInfoTabText}>Returns</Text>
              <Image
                source={require("../../assets/utilsImage/VectorArrow.png")}
              />
            </View>
          </View>
          <View style={{ ...styles.orderInfoTab, marginBottom: 120 }}>
            <Text style={styles.orderInfoTabTitle}>Delivery</Text>
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  ...styles.orderInfoTabText,
                  fontSize: 14,
                  fontWeight: "medium",
                  color: "#475467",
                }}
              >
                Subtotal
              </Text>
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                {formatPrice(
                  orderDetail?.total_price -
                    orderDetail?.delivery_method?.price +
                    (orderDetail?.voucher_id
                      ? orderDetail?.voucher_id?.is_percent
                        ? ((orderDetail?.total_price -
                            orderDetail?.delivery_method?.price) *
                            orderDetail?.voucher_id?.voucher_discount) /
                          100
                        : orderDetail?.voucher_id?.voucher_discount
                      : 0)
                )}{" "}
                VNĐ
              </Text>
            </View>
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                Discount
              </Text>
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                {formatPrice(
                  (orderDetail.voucher_id?._id &&
                    (orderDetail.voucher_id?.is_percent
                      ? ((orderDetail.total_price -
                          orderDetail.delivery_method?.price) *
                          orderDetail.voucher_id.voucher_discount) /
                        100
                      : orderDetail.voucher_id.voucher_discount)) ||
                    0
                )}{" "}
                VNĐ
              </Text>
            </View>
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                Delivery
              </Text>
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                {formatPrice(orderDetail.delivery_method?.price)} VNĐ
              </Text>
            </View>
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                Fee
              </Text>
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                {formatPrice(0)} VNĐ
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderStyle: "dashed",
                marginBottom: 6,
              }}
            />
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>
                Total
              </Text>
              <Text
                style={{
                  ...styles.orderInfoTabText,
                  color: "#1D2939",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {formatPrice(orderDetail.total_price)} VNĐ
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    backgroundColor: "#FFFFFF",
  },
  orderContainer: {
    width: "100%",
    paddingHorizontal: 18,
  },
  orderTime: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 12,
    gap: 12,
  },
  orderTimeTitle: {
    fontSize: 9,
    fontWeight: "regular",
    color: "#667085",
  },
  orderTimeValue: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "#1D2939",
    paddingRight: 12,
    borderColor: "#D0D5DD",
  },
  deliveryIcon: {
    height: "100%",
  },
  orderTimeExpDate: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "#12B76A",
  },
  orderStatusBar: {
    width: "90%",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 28,
  },
  dashLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#D0D5DD",
    marginVertical: 18,
  },

  header: {
    position: "relative",
    width: WIDTH,
    // height: HEIGHT * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingVertical: 20,
    // paddingTop: 0,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,

    shadowColor: "rgba(0,0,0,0.1)", // Black color
    shadowOffset: { width: 0, height: -4 }, // X: 0, Y: -4
    shadowOpacity: 0.1, // 10% opacity
    shadowRadius: 14, // Blur: 14
    elevation: 3,
  },
  orderCode: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#22190C",
  },

  bookingCardContainer: {
    height: HEIGHT * 0.1,
    width: WIDTH,
    overflow: "visible",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginBottom: 12,
    // justifyContent: "space-between"
  },
  imageContainer: {
    width: "22%",
    height: "100%",
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#D0D5DD",
  },
  image: {
    width: "100%",
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
    position: "relative",
    width: "100%",
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  funcionalButton: {
    borderWidth: 2,
    borderRadius: 8,
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#344054",
  },
  centerStock: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#DB8B00",
  },
  amount: {
    fontSize: 11,
    fontWeight: "regular",
    color: "#344054",
  },
  split: {
    marginHorizontal: 2,
    height: 18,
    width: 2,
    backgroundColor: "#D0D5DD",
  },
  centerPrice: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#1D2939",
  },
  planter: {
    height: HEIGHT * 0.08,
    flexDirection: "row",
  },
  textPlanter: {
    fontSize: 12,
  },
  planterImage: {
    height: WIDTH * 0.08,
    width: WIDTH * 0.08,
    marginLeft: 8,
  },

  orderInfo: {
    flexDirection: "row",
  },
  orderInfoTab: {
    width: "50%",
  },
  orderInfoTabTitle: {
    fontSize: 14,
    fontWeight: "medium",
    marginBottom: 12,
  },
  orderInfoTabText: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#667085",
  },
  orderMethodImage: {
    width: WIDTH * 0.05,
    height: "100%",
    marginLeft: 12,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
