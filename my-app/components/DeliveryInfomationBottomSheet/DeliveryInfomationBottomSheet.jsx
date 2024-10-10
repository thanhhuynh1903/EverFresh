import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { selectGallery, selectUser } from "../../redux/selector/selector";
import { formatPrice } from "../../utils/utils";
import AddCardBottomSheet from "../AddCardBottomSheet/AddCardBottomSheet";
import AddDeliveryInfoModal from "./AddNewModal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function DeliveryInfomationBottomSheet({
  visible,
  chooseDeliveryInfo,
  deliveryInfoList,
  setDeliveryInfoList,
  onClose,
}) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [addNewVisible, setAddNewVisible] = useState(false);
  const [focusItem, setFocusItem] = useState(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const bottomSheetRef = useRef(null);
  const userRedux = useSelector(selectUser);

  useEffect(() => {
    if (visible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [visible]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
    if (onClose) onClose();
  };

  const handleChooseCollection = (item) => {
    if (chooseDeliveryInfo) {
      chooseDeliveryInfo(item);
    }
    closeBottomSheet();
  };

  const handleEdit = (item) => {
    setFocusItem(item);
    setAddNewVisible(true);
  };

  const renderDeliveryInfo = (item, key) => {
    return (
      <View style={styles.collectionCard} key={key}>
        <View style={styles.shippingAddressDetail}>
          <TouchableOpacity
            style={styles.shippingAddressDetailLeft}
            onPress={() => handleChooseCollection(item)}
          >
            <Text style={styles.shippingAddressDetailLeftText}>
              {userRedux?.user?.name} - {item?.phone_number}
            </Text>
            <Text style={styles.shippingAddressDetailLeftText}>
              {item?.address_detail} {item?.address}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shippingAddressDetailRight}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {bottomSheetVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeBottomSheet}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        style={{ zIndex: 999 }}
      >
        {/* <TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ ...styles.collectionCard, paddingHorizontal: WIDTH * 0.1 }}
          onPress={() => {
            setFocusItem(null);
            setAddNewVisible(true);
          }}
        >
          <View style={{ ...styles.shippingAddressDetail, width: "100%" }}>
            <View style={{ ...styles.shippingAddressDetailLeft, width: "82%" }}>
              <Text style={styles.shippingAddressDetailLeftText}>
                Add new address
              </Text>
            </View>
            <View style={styles.shippingAddressDetailRight}>
              <Icon name="plus" size={30} color="rgba(0,0,0,0.5)" />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.sheetContent}>
          {deliveryInfoList.map((item, key) => renderDeliveryInfo(item, key))}
        </View>
        <AddDeliveryInfoModal
          visible={addNewVisible}
          onClose={() => {
            setAddNewVisible(false);
          }}
          onSubmit={(item, type) => {
            if (type === "update") {
              setDeliveryInfoList((prevList) =>
                prevList.map((deliveryItem) =>
                  deliveryItem._id === item._id ? item : deliveryItem
                )
              );
            } else if (type === "delete") {
              setDeliveryInfoList((prevList) =>
                prevList.filter((deliveryItem) => deliveryItem._id !== item._id)
              );
            } else {
              setDeliveryInfoList([...deliveryInfoList, item]);
            }
          }}
          deliveryObject={focusItem}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: WIDTH,
    height: HEIGHT,
    top: 0,
    left: 0,
  },
  layout: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
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
  shippingAddressDetail: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  shippingAddressDetailLeft: {
    width: "70%",
  },
  shippingAddressDetailRight: {
    width: "15%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  edit: {
    color: "green",
    fontWeight: "bold",
  },
  shippingAddressChange: {
    marginTop: 12,
  },
  shippingAddressChangetText: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#0D986A",
  },

  collectionCard: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT * 0.1,
    flexDirection: "row",
    // gap: WIDTH * 0.05,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
  collectionCardImage: {
    height: "80%",
    width: HEIGHT * 0.1,
  },
  collectionCardInfor: {
    height: "100%",
    justifyContent: "space-around",
  },
  collectionName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
