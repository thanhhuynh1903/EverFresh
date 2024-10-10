import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import {
  formatPrice,
  getCollectionIdFromPlantId,
  getPlantIdListinGalery,
} from "../../utils/utils";
import BottomSheetHeader from "../../components/BottomSheetHeader/BottomSheetHeader";
import PlantBookingCard from "../../components/PlantBookingCard/PlantBookingCard";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectGallery } from "../../redux/selector/selector";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import { getPlants } from "../../api/plant";
import { getDeliveryMethods } from "../../api/delivery";
import { getCartItemsThunk } from "../../redux/thunk/cartThunk";
import { deleteCartItem, updateCartItem } from "../../api/cart";
import useCustomToast from "../../components/ToastNotification/ToastNotification";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  addToCollections,
  changeCollections,
  removePlantFromCollections,
} from "../../api/collection";
import {
  getAllPlantsFromGalleryThunk,
  getGaleryThunk,
} from "../../redux/thunk/galleryThunk";
import CollectionListBottomSheet from "../../components/CollectionListBottomSheet/CollectionListBottomSheet";
import DeliveryListBottomSheet from "../../components/DeliveryListBottomSheet/DeliveryListBottomSheet";
import CouponListBottomSheet from "../../components/CouponListBottomSheet/CouponListBottomSheet";
import { getVouchers } from "../../api/voucher";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function CartView({ goback }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const cartRedux = useSelector(selectCart);
  const galleryRedux = useSelector(selectGallery);
  const [cart, setCart] = useState([]);
  const [focusPlant, setFocusPlant] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const [loading, setLoading] = useState(true);
  // bottomsheet visib;e
  const [chooseCollectionVisible, setChooseCollectionVisible] = useState(false);
  const [chooseDeliveryVisible, setChooseDeliveryVisible] = useState(false);
  const [chooseCouponVisible, setChooseCouponVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadDeliveryMethod();
      loadCouponList();
    }, [])
  );

  useEffect(() => {
    loadCartList();
  }, [cartRedux.cartList]);

  useEffect(() => {
    setDeliveryMethod(deliveryMethodList[0]);
  }, [deliveryMethodList]);

  const loadCartList = async () => {
    setLoading(true);

    const updatedCart = await Promise.all(
      cartRedux.cartList[0]?.list_cart_item_id?.map(async (cartItem) => {
        const response = await getPlants(cartItem.plant_id);
        return {
          ...cartItem,
          selected: true,
          product: {
            ...cartItem.product,
            quantity: cartItem.quantity,
          },
        };
      })
    );

    setCart(updatedCart);
    setLoading(false);
  };

  const loadDeliveryMethod = async () => {
    const response = await getDeliveryMethods();
    if (response.status === 200) {
      setDeliveryMethodList(response.data);
    }
  };

  const loadCouponList = async () => {
    const response = await getVouchers();
    if (response.status === 200) {
      setCouponList(response.data);
    }
  };

  const paymentPrice = useMemo(() => {
    let totalPrice = 0;
    cart
      .filter((item) => item.selected)
      .map((item) => {
        totalPrice += item?.quantity * item?.product?.price;
      });
    if (coupon) {
      coupon.is_percent
        ? (totalPrice -= (totalPrice * coupon?.voucher_discount) / 100)
        : (totalPrice -= coupon?.voucher_discount);
    }

    if (deliveryMethod) {
      totalPrice += deliveryMethod?.price;
    }
    return totalPrice;
  }, [cart, coupon, deliveryMethod]);

  const slectedItems = useMemo(() => {
    return cart.filter((item) => item.selected);
  }, [cart]);

  const plantIdListinGalery = useMemo(() => {
    return getPlantIdListinGalery(galleryRedux.galleries);
  }, [galleryRedux]);

  const hanldeChangeAmount = async (item, amount) => {
    const response = await updateCartItem(item?._id, amount);
    if (amount === 0) {
      setCart(cart.filter((cartItem) => cartItem?._id !== item?._id));
    } else {
      setCart(
        cart.map((cartItem) => {
          return {
            ...cartItem,
            quantity: cartItem?._id === item?._id ? amount : cartItem.quantity,
            product: {
              ...cartItem.product,
              quantity:
                cartItem?._id === item?._id ? amount : cartItem.quantity,
            },
          };
        })
      );
    }
  };

  const handleDeteteCartItem = async (item) => {
    const response = await deleteCartItem(item?._id);
    if (response.status === 200) {
      setCart(cart.filter((cartItem) => cartItem?._id !== item?._id));
      // await dispatch(getCartItemsThunk());
      setTimeout(() => {
        dispatch(getCartItemsThunk());
      }, 3000);
    } else {
      await dispatch(getCartItemsThunk());
    }
  };

  const handleDeleteSelectedItems = async () => {
    try {
      const deletePromises = slectedItems.map((item) =>
        deleteCartItem(item?._id)
      );
      const responses = await Promise.all(deletePromises);
      const successfulDeletes = responses.filter(
        (response) => response.status === 200
      );
      setCart((prevCart) =>
        prevCart.filter(
          (cartItem) => !items.some((item) => item?._id === cartItem?._id)
        )
      );
      dispatch(getCartItemsThunk());
    } catch (error) {
      console.error("Error deleting items: ", error);
    }
  };

  const handleChangeSelected = (item) => {
    setCart(
      cart.map((cartItem) => {
        return {
          ...cartItem,
          selected:
            cartItem?._id === item?._id
              ? !cartItem.selected
              : cartItem.selected,
        };
      })
    );
  };

  const handleAddToCollection = async (item) => {
    const response = await addToCollections(item.product?._id);
    if (response.status === 201) {
      showToast({
        title: "Success",
        message: (
          <View
            style={{
              width: WIDTH * 0.75,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Add to collection successfully</Text>
            <TouchableOpacity
              onPress={() => {
                setChooseCollectionVisible(true);
                setFocusPlant(item);
              }}
            >
              <Text style={{ color: "#4287f5", fontWeight: "bold" }}>
                Manager
              </Text>
            </TouchableOpacity>
          </View>
        ),
        type: "success",
        // position: "bottom",
      });
      await dispatch(getGaleryThunk()).then((response) => {
        dispatch(getAllPlantsFromGalleryThunk(response.payload));
      });
    } else {
      showToast({
        title: "Fail",
        message: `Add plant to collection fail`,
        type: "error",
      });
    }
  };

  const handleRemoveToCollection = async (item) => {
    const collectionId = getCollectionIdFromPlantId(
      galleryRedux.galleries,
      item.product?._id
    );

    const response = await removePlantFromCollections(
      item.product?._id,
      collectionId
    );
    if (response.status === 200) {
      showToast({
        title: "Success",
        message: "Remove from collection successfully",
        type: "success",
        // position: "bottom",
      });
      await dispatch(getGaleryThunk()).then((response) => {
        dispatch(getAllPlantsFromGalleryThunk(response.payload));
      });
    } else {
      showToast({
        title: "Fail",
        message: `Remove plant from collection fail`,
        type: "error",
      });
    }
  };

  const handleChangeCollections = async (collection) => {
    const response = await changeCollections(
      focusPlant.product?._id,
      collection.collection_name
    );
    if (response.status === 201) {
      showToast({
        title: "Success",
        message: `Change to collection ${collection?.collection_name} successfully`,
        type: "success",
        // position: "bottom",
      });
      await dispatch(getGaleryThunk()).then((response) => {
        dispatch(getAllPlantsFromGalleryThunk(response.payload));
      });
    } else {
      showToast({
        title: "Fail",
        message: `Change collection fail`,
        type: "error",
      });
    }
  };

  const handleChangeDeliveryMethod = (item) => {
    setDeliveryMethod(item);
  };

  const handleChangeCoupon = (item) => {
    setCoupon(item);
  };

  const renderCardBooking = (item, key) => {
    item.bookmark = plantIdListinGalery.includes(item.product?._id);

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        key={key}
        //  onPress={() => handleChangeSelected(item)}
      >
        {item.selected ? (
          <Icon name="checkbox-marked" size={32} color="#8688BC" />
        ) : (
          <Icon name="checkbox-blank-outline" size={32} color="#8688BC" />
        )}
        <PlantBookingCard
          plant={item?.product}
          hanldeIncrease={() =>
            hanldeChangeAmount(item?.product, item.quantity + 1)
          }
          hanldeDecrease={() =>
            hanldeChangeAmount(item?.product, item.quantity - 1)
          }
          handleDelete={() => handleDeteteCartItem(item?.product)}
          handleAddToCollection={() =>
            item?.product.bookmark
              ? handleRemoveToCollection(item?.product)
              : handleAddToCollection(item?.product)
          }
          onPress={() => handleChangeSelected(item?.product)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BottomSheetHeader
        goback={() => {
          navigation.goBack();
          dispatch(getCartItemsThunk());
        }}
        title={"Your Cart"}
      />
      <ScrollView
        style={{
          ...styles.contentContainer,
          marginBottom: Platform.OS === "android" ? 0 : "15%",
        }}
      >
        <View style={styles.cartHeader}>
          <Text style={styles.cartAmount}>
            {cartRedux.cartList[0]?.list_cart_item_id.length} items
          </Text>
          <TouchableOpacity
            style={{ ...styles.flexRow, transform: [{ translateX: 20 }] }}
          >
            <Icon name="check" size={32} color="#424347" />
            <Text style={styles.cartHeaderText}>Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={handleDeleteSelectedItems}
          >
            <Image
              source={require("../../assets/cart/delete.png")}
              resizeMode="stretch"
              style={styles.deleteImage}
            />
            <Text style={styles.cartHeaderText}>Delete Selected</Text>
          </TouchableOpacity>
        </View>
        <View>
          {!loading && cart.map((item, key) => renderCardBooking(item, key))}
        </View>
        <TouchableOpacity
          style={styles.bookingInfor}
          onPress={() => {
            setChooseDeliveryVisible(true);
          }}
        >
          <View style={styles.bookingInfoImage}>
            <Image
              source={require("../../assets/cart/deliveryIcon.png")}
              resizeMode="stretch"
              style={styles.bookingInfoImageView}
            />
          </View>
          <View style={styles.bookingInfoRight}>
            <Text style={styles.bookingInfoRightTitle}>Delivery</Text>
            <View style={styles.bookingInfoRightStatus}>
              <View style={styles.bookingInfoRightStatusComplete} />
            </View>
            <Text style={styles.bookingInfoRightPrice}>
              {formatPrice(deliveryMethod?.price || 0)} VND
            </Text>
            <Text style={styles.bookingInfoRightFree}>
              Order above 1.000.000 VND to get free delivery
            </Text>
            <Text style={styles.bookingInfoRightPriceLeft}>
              Shop for more {formatPrice(1000000 - paymentPrice || 0)} VND
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingInfor}
          onPress={() => {
            setChooseCouponVisible(true);
          }}
        >
          <View style={styles.bookingInfoImage}>
            <Image
              source={require("../../assets/cart/couponIcon.png")}
              resizeMode="stretch"
              style={styles.bookingInfoImageView}
            />
          </View>
          <View style={styles.bookingInfoRight}>
            <Text style={{ ...styles.bookingInfoRightTitle, width: "25%" }}>
              Apply Coupon
            </Text>
            {coupon ? (
              <View
                style={{
                  width: "45%",
                }}
              >
                <Text>
                  {coupon.voucher_name} ({coupon.voucher_discount}%)
                </Text>
              </View>
            ) : (
              <View
                style={{
                  ...styles.bookingInfoRightStatus,
                  width: "40%",
                  height: 2,
                }}
              >
                <View
                  style={{
                    ...styles.bookingInfoRightStatusComplete,
                    width: "100%",
                    height: 2,
                  }}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>Sub-total:</Text>
          <Text style={styles.totalPriceText}>
            {formatPrice(paymentPrice)} VNĐ
          </Text>
        </View>
        {/* <View style={styles.totalPrice}>
          <Text style={styles.saveText}>Saved for later</Text>
          <Text style={styles.saveText}>6 items</Text>
        </View> */}
        {/* <View style={styles.savePlantList}>
          {savePlantList.map((item, key) => (
            <PlantBookingCard item={item} key={key} />
          ))}
        </View> */}
      </ScrollView>
      {paymentPrice - (deliveryMethod?.price || 0) !== 0 && (
        <LinearGradient
          colors={["#0B845C", "#0D986A"]} // Set the gradient colors
          start={{ x: 1, y: 0 }} // Start from the right
          end={{ x: 0, y: 0 }} // End at the left
          style={{
            ...styles.bottomCartSheet,
            bottom: Platform.OS === "android" ? "8%" : "6%",
          }}
        >
          <TouchableOpacity
            style={styles.bottomCartSheetContainer}
            onPress={() => {
              dispatch(getCartItemsThunk());
              navigation.navigate("Checkout", {
                cart: cart,
                deliveryMethod: deliveryMethod,
                coupon: coupon,
                currentCart: cartRedux.cartList[0],
              });
            }}
          >
            <View style={styles.bottomCartSheetContainerLeft}>
              <Text style={styles.bottomCartSheetContainerRight}>Checkout</Text>
            </View>
            <Text style={styles.bottomCartSheetContainerRight}>
              {formatPrice(paymentPrice || 0)} VND
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
      {/* {loading && <SpinnerLoading />} */}
      <CollectionListBottomSheet
        visible={chooseCollectionVisible}
        onClose={() => setChooseCollectionVisible(false)}
        chooseCollection={(item) => handleChangeCollections(item)}
      />
      <DeliveryListBottomSheet
        visible={chooseDeliveryVisible}
        deliveryMethodList={deliveryMethodList}
        onClose={() => setChooseDeliveryVisible(false)}
        chooseCollection={(item) => handleChangeDeliveryMethod(item)}
      />
      <CouponListBottomSheet
        visible={chooseCouponVisible}
        couponList={couponList}
        onClose={() => setChooseCouponVisible(false)}
        chooseCollection={(item) => handleChangeCoupon(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    // marginBottom: 100,
    backgroundColor: "#FFFFFF",
    // zIndex: 11,
  },
  contentContainer: {
    position: "relative",
    paddingHorizontal: 16,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  cartAmount: {
    fontSize: 13,
    color: "#BBBBBB",
    fontWeight: "regular",
  },
  cartHeaderText: {
    fontSize: 13,
    color: "#3E3E3E",
    fontWeight: "regular",
  },
  bookingInfor: {
    width: WIDTH,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  bookingInfoImage: {
    height: 80,
    width: 80,
    // padding: 12,
    borderRadius: 50,
    backgroundColor: "#E3FDF4",
    justifyContent: "center",
    alignItems: "center",
  },
  bookingInfoRight: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 3,
  },
  bookingInfoRightTitle: {
    width: "17.5%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#002140",
    flexWrap: "nowrap",
  },
  bookingInfoRightStatus: {
    position: "relative",
    width: "30%",
    height: 4,
    backgroundColor: "#BCFAE5",
    marginRight: 12,
  },
  bookingInfoRightStatusComplete: {
    width: "80%",
    position: "absolute",
    height: 4,
    left: 0,
    backgroundColor: "#0D986A",
  },
  bookingInfoRightPrice: {
    width: "20%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#002140",
  },
  bookingInfoRightFree: {
    width: "100%",
    fontSize: 12,
    fontWeight: "regular",
    color: "#002140",
  },
  bookingInfoRightPriceLeft: {
    width: "100%",
    fontSize: 12,
    fontWeight: "regular",
    color: "#0D986A",
  },

  bookingCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },

  // totalPrice
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  totalPriceText: {
    fontSize: 28,
    fontWeight: "semibold",
    color: "#002140",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#0D986A",
  },
  savePlantList: {
    width: WIDTH,
    gap: 12,
    marginBottom: 100,
  },
  // bottomCartSheet
  bottomCartSheet: {
    position: "absolute",
    width: WIDTH,
    flexDirection: "row",
    borderRadius: 50,
    bottom: 0,
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

  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: WIDTH,
    height: HEIGHT,
    top: 0,
    left: 0,
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

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
