import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import HomeHeader from "../../components/HomeHeader";
import MenuModal from "../../components/Modal/MenuModal/MenuModal";
import { formatPrice } from "../../utils/utils";
import { getOrder } from "../../api/order";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function OrderList() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadOrderList();
    }, [])
  );

  const loadOrderList = async () => {
    setLoading(true);
    const response = await getOrder();
    if (response.status === 200) {
      setOrderList(response.data.reverse());
    }
    setLoading(false);
  };

  const renderOrderItem = (item, key) => {
    let totalPrice = 0;
    item?.list_cart_item_id?.map(
      (item) => (totalPrice += item?.item_total_price)
    );

    return (
      <TouchableOpacity
        style={styles.orderItem}
        key={key}
        onPress={() =>
          navigation.navigate("TrackingOrder", { orderDetail: item })
        }
      >
        <View style={styles.orderItemHeader}>
          <Text style={styles.orderItemHeaderId} numberOfLines={1}>
            ID: {item._id}
          </Text>
          <Text style={styles.orderItemHeaderStatus}>{item.status}</Text>
        </View>
        <View style={styles.orderItemInfo}>
          <Image
            source={
              // item?.list_cart_item_id[0]?.plant_id?.img_url[0]
              //   ? {
              //       uri: item?.list_cart_item_id[0]?.plant_id?.img_url[0] || "",
              //     }
              //   :
              require("../../assets/cart/plant1.png")
            }
            resizeMode="stretch"
            style={styles.image}
          />
          <View style={styles.orderItemInfoBody}>
            {item?.list_cart_item_id?.map((plant, index) => {
              return (
                <View style={styles.orderItemPlant} key={index}>
                  {plant?.plant_id?.name && (
                    <Text style={styles.plantName}>
                      {plant?.plant_id?.name}
                    </Text>
                  )}
                  <View
                    style={{
                      ...styles.flexRow,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.plantPrice}>
                      {formatPrice(plant?.item_total_price)} VNĐ
                    </Text>
                    <Text style={styles.plantPrice}>x {plant?.quantity}</Text>
                  </View>
                </View>
              );
            })}
            <View style={styles.orderItemInfoBottom}>
              <Text style={styles.totalPrice}>
                Total {formatPrice(totalPrice || 0)} VNĐ
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HomeHeader
        navigation={navigation}
        handleMenuToggle={() => setMenuVisible(!menuVisible)}
        backgroundColor={menuVisible && "#0B845C"}
      />
      <ScrollView style={styles.container}>
        {!loading ? (
          orderList?.map((item, key) => renderOrderItem(item, key))
        ) : (
          <SpinnerLoading />
        )}
      </ScrollView>
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
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    marginBottom: 100,
  },
  orderItem: {
    height: HEIGHT * 0.2,
    width: WIDTH - 12 * 2,
    margin: 12,
    padding: 12,
    borderRadius: 12,
    overflow: "visible",
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  orderItemHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  orderItemHeaderId: {
    width: "60%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#002140",
  },
  orderItemHeaderStatus: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#002140",
  },
  orderItemInfo: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: "30%",
    height: "95%",
  },
  orderItemInfoBody: {
    width: "65%",
    height: "90%",
    paddingVertical: 12,
    paddingRight: 0,
    justifyContent: "space-between",
  },
  orderItemPlant: {
    // height: "20%",
    // flexDirection: "row",
  },
  plantName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#002140",
  },
  plantPrice: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "#002140",
  },
  orderItemInfoBottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#002140",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
