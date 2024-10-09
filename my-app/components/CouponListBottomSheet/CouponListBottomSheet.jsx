import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { selectGallery } from "../../redux/selector/selector";
import { formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function CouponListBottomSheet({
  visible,
  chooseCollection,
  couponList,
  onClose,
}) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const bottomSheetRef = useRef(null);

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
    if (chooseCollection) {
      chooseCollection(item);
      closeBottomSheet();
    }
  };

  const renderDeliveryCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.collectionCard}
        onPress={() => handleChooseCollection(item)}
        key={key}
      >
        <Image
          source={require("../../assets/notificate/new_voucher.png")}
          resizeMode="stretch"
          style={styles.collectionCardImage}
        />
        <View style={styles.collectionCardInfor}>
          <Text style={styles.collectionName}>{item?.voucher_name}</Text>
          <Text>Discount {item?.voucher_discount}%</Text>
        </View>
        <View style={styles.chevronIcon}>
          <Icon name="chevron-right" size={30} color="rgba(0,0,0,0.5)" />
        </View>
      </TouchableOpacity>
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
        <View style={styles.sheetContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeBottomSheet}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Choose coupon</Text>
          <View style={styles.collectionList}>
            {couponList?.map((item, key) => renderDeliveryCard(item, key))}
          </View>
        </View>
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

  collectionCard: {
    position: "relative",
    width: WIDTH,
    height: HEIGHT * 0.1,
    flexDirection: "row",
    gap: WIDTH * 0.05,
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
  chevronIcon: {
    position: "absolute",
    right: "10%",
  },
});
