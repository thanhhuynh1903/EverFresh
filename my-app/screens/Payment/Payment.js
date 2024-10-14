import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { paymentMomo, paymentStripe } from "../../api/payment";
import { createOrder, getNewestOrder } from "../../api/order";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice, successfulStatus } from "../../utils/utils";
import AddCardBottomSheet from "../../components/AddCardBottomSheet/AddCardBottomSheet";
import { useStripe } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPaymentMethod } from "../../api/linkedInformation";
import { selectUser } from "../../redux/selector/selector";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const momoMethod = {
  _id: "1",
  title: "Item 1",
  type: "MOMO",
  imageUrl: require("../../assets/utilsImage/card-1.png"),
};

export default function Payment({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userRedux = useSelector(selectUser);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const flatListRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const [cart, setCart] = useState(route.params.cart);

  const deliveryMethod = useMemo(() => {
    return route.params.deliveryMethod;
  }, [route.params.deliveryMethod]);

  const voucher = useMemo(() => {
    return route.params.voucher;
  }, [route.params.voucher]);

  const deliveryInformation = useMemo(() => {
    return route.params.deliveryInformation;
  }, [route.params.deliveryInformation]);

  const paymentPrice = useMemo(() => {
    let totalPrice = 0;
    cart
      .filter((item) => item.selected)
      .map((item) => {
        totalPrice += item?.quantity * item?.product?.price;
      });
    if (voucher) {
      voucher.is_percent
        ? (totalPrice -= (totalPrice * voucher?.voucher_discount) / 100)
        : (totalPrice -= voucher?.voucher_discount);
    }

    return totalPrice;
  }, [cart, voucher]);

  useEffect(() => {
    loadPaymentMethod();
  }, []);

  const loadPaymentMethod = async () => {
    const response = await getPaymentMethod();
    if (successfulStatus(response.status)) {
      setPaymentMethodList([
        momoMethod,
        ...response.data.map((item) => {
          return {
            ...item,
            type: "STRIPE",
            imageUrl: require("../../assets/visaCard.png"),
          };
        }),
      ]);
    } else {
      console.log(response?.response?.data);
    }
  };

  let intervalId;

  const checkPaymentSuccess = async () => {
    const response = await getNewestOrder();
    if (successfulStatus(response.status)) {
      if (response.data.is_new) {
        clearInterval(intervalId);
        navigation.navigate("OrderComplete", { order: response.data });
      }
    }
  };
  intervalId = setInterval(checkPaymentSuccess, 3000);
  // stripe

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const data = {
      delivery_method_id: deliveryMethod._id,
      delivery_information_id: deliveryInformation._id,
      cart_id: route.params.currentCart._id,
      linked_information_id: "66ffcf324bff98afff2cb039",
    };
    if (route.params.voucher) {
      data.voucher_id = route.params.voucher._id;
    }

    const response = await fetch(
      "https://everfresh-server.onrender.com/api/payment/stripe/payment-sheet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Jane Doe",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set allowsDelayedPaymentMethods to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  const handlePayment = async () => {
    const data = {
      delivery_method_id: deliveryMethod._id,
      delivery_information_id: deliveryInformation._id,
      cart_id: route.params.currentCart._id,
    };
    if (route.params.voucher) {
      data.voucher_id = route.params.voucher._id;
    }
    const response = await paymentMomo(data);

    if (successfulStatus(response.status)) {
      await Linking.openURL(response?.data?.deeplink);
      console.log(response?.data?.deeplink);
      console.log(response?.data?.payUrl);
    } else {
      console.log(response?.response?.data);
    }
  };

  const handlePaymentStripe = async () => {
    const data = {
      delivery_method_id: deliveryMethod._id,
      delivery_information_id: deliveryInformation._id,
      cart_id: route.params.currentCart._id,
      linked_information_id: "66ffcf324bff98afff2cb039",
    };
    if (route.params.voucher) {
      data.voucher_id = route.params.voucher._id;
    }
    console.log(data);

    const response = await paymentStripe(data);

    if (successfulStatus(response.status)) {
      console.log(response?.data);

      await Linking.openURL(response?.data?.url);
    } else {
      console.log(response?.data);
      console.log(response?.response?.data);
    }
  };

  const handleCreateOrder = async () => {
    const data = {
      payment_method: "MOMO",
      delivery_method_id: deliveryMethod._id,
      delivery_information_id: deliveryInformation._id,
      cart_id: route.params.currentCart._id,
    };
    if (route.params.voucher) {
      data.voucher_id = route.params.voucher._id;
    }

    const response = await createOrder(data);
    if (successfulStatus(response.status)) {
      await dispatch(getCartItemsThunk());
      console.log(response.data);

      navigation.navigate("OrderComplete", { order: response.data });
    } else {
      console.log(response?.response?.data);
    }
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.imageUrl}
        style={styles.carouselImage}
        resizeMode="stretch"
      />
      {item.type !== "MOMO" && (
        <View style={styles.textOverlay}>
          <Text style={{ ...styles.carouselText, right: "8%" }}>
            {item.card_number % 10000}
          </Text>
          <Text
            style={{
              ...styles.carouselText,
              left: "8%",
              bottom: "15%",
              fontSize: 12,
            }}
          >
            {item.author}
          </Text>
          <Text
            style={{
              ...styles.carouselText,
              right: "8%",
              bottom: "15%",
              fontSize: 12,
            }}
          >
            {item.expiration_date}
          </Text>
        </View>
      )}
    </View>
  );

  // Render dots for the carousel
  const renderDots = (paymentMethodList) => (
    <View style={styles.dotContainer}>
      {paymentMethodList.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: currentIndex === index ? "#0D986A" : "#ccc" },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: "white" }}>
        <TouchableOpacity
          style={styles.iconstyle}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={32} color="#424347" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.shippingAddress}>
          <Text style={styles.shippingAddressTitle}>Shipping address</Text>
          <View style={styles.shippingAddressDetail}>
            <View style={styles.shippingAddressDetailLeft}>
              <Text style={styles.shippingAddressDetailLeftText}>
                {userRedux?.user?.name} - {deliveryInformation?.phone_number}
              </Text>
              <Text style={styles.shippingAddressDetailLeftText}>
                {deliveryInformation?.address_detail}{" "}
                {deliveryInformation?.address}
              </Text>
            </View>
            <View style={styles.shippingAddressDetailRight}>
              <Icon name="circle-slice-8" size={32} color="#8688BC" />
            </View>
          </View>
        </View>

        {/* Carousel */}
        <FlatList
          ref={flatListRef}
          data={paymentMethodList}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled={true} // Disable default paging since we are customizing it
          // snapToInterval={WIDTH} // Width of card + margins
          decelerationRate="fast" // Fast snapping behavior
          snapToAlignment="center" // Snap the card to the center
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(
              event.nativeEvent.contentOffset.x / WIDTH
            );
            setCurrentIndex(newIndex);
          }}
        />

        {/* Dots */}
        {renderDots(paymentMethodList)}

        <View style={styles.paymentTitle}>
          <Text style={styles.paymentTitleText}>Payment </Text>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => {
              bottomSheetRef.current?.expand();
              setBottomSheetVisible(true);
            }}
          >
            <Icon name="plus" size={28} color="#8688BC" />
            <Text style={styles.paymentTitltAddText}>Add New Card</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Summary */}
        <View style={styles.paymentDetail}>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={styles.paymentDetailTitle}>Order</Text>
            <Text style={styles.paymentDetailText}>
              {formatPrice(paymentPrice || 0)} VNĐ
            </Text>
          </View>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={styles.paymentDetailTitle}>Delivery</Text>
            <Text style={styles.paymentDetailText}>
              {formatPrice(deliveryMethod?.price)} VNĐ
            </Text>
          </View>
          <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
            <Text style={{ ...styles.paymentDetailTitle, fontSize: 16 }}>
              Summary
            </Text>
            <Text style={{ ...styles.paymentDetailText, fontSize: 16 }}>
              {formatPrice((paymentPrice || 0) + deliveryMethod?.price)} VNĐ
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={async () => {
            currentIndex === 0 ? handlePayment() : handlePaymentStripe();

            // handlePayment();
            // handlePaymentStripe();
            // console.log("get innnn");
            // try {
            //   await initializePaymentSheet().then(async () => {
            //     console.log("get in");

            //     await openPaymentSheet();
            //     console.log("get in 2");
            //   });
            // } catch (error) {
            //   console.log(error);
            // }

            // console.log(paymentMethodList);
          }}
          onLongPress={handleCreateOrder}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
      <AddCardBottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSubmit={(item) => {
          setPaymentMethodList([
            ...paymentMethodList,
            {
              ...item,
              type: "STRIPE",
              imageUrl: require("../../assets/visaCard.png"),
            },
          ]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {},
  header: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT * 0.05,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",

    shadowColor: "rgba(0,0,0,0.1)", // Black color
    shadowOffset: { width: 0, height: -4 }, // X: 0, Y: -4
    shadowOpacity: 0.1, // 10% opacity
    shadowRadius: 14, // Blur: 14
    elevation: 3,
  },
  iconstyle: {
    position: "absolute",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.045,
    resizeMode: "contain",
    left: "10%",
    bottom: 5,
    fontSize: 17,
    color: "#0D986A",
    fontWeight: "regular",
  },
  backButton: {
    fontSize: 17,
    color: "#0D986A",
    fontWeight: "regular",
  },
  fetureList: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: HEIGHT * 0.05,
    gap: 12,
    marginRight: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  shippingAddress: {
    width: WIDTH,
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#F5F5F5",
    opacity: 0.5,
  },
  shippingAddressTitle: {
    fontSize: 22,
    color: "#424347",
    marginBottom: 24,
  },
  shippingAddressDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  shippingAddressDetailLeft: {
    width: "85%",
  },
  shippingAddressChange: {
    marginTop: 12,
  },
  shippingAddressChangetText: {
    fontSize: 14,
    color: "#0D986A",
  },
  paymentTitle: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginVertical: 18,
    justifyContent: "space-between",
  },
  paymentTitleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#424347",
  },
  paymentTitltAddText: {
    fontSize: 13,
    color: "#3E3E3E",
    marginLeft: 8,
  },
  proceedButton: {
    marginHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: "#0D986A",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  paymentDetail: {
    marginHorizontal: 28,
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentDetailTitle: {
    fontSize: 14,
    color: "#8688BC",
  },
  paymentDetailText: {
    fontSize: 14,
    color: "#000000",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    zIndex: 998,
  },
  sheetContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  closeText: {
    fontSize: 30,
    color: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: "48%",
  },

  carouselItem: {
    width: WIDTH, // Set width to 60% of the screen width
    // marginHorizontal: WIDTH * 0.1, // Set margin to 10% of the screen width on both sides
    height: 280,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  textOverlay: {
    position: "absolute", // Overlay the text on top of the image
    top: "7%",
    bottom: "11%",
    left: "6%",
    right: "6%",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: "white",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
