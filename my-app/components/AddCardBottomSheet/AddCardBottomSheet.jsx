import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { createPaymentMethod } from "../../api/linkedInformation";
import { successfulStatus } from "../../utils/utils";
import useCustomToast from "../ToastNotification/ToastNotification";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function AddCardBottomSheet({ visible, onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const showToast = useCustomToast();

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

  const handleSubmit = async () => {
    const newCard = {
      author: name,
      card_number: Number(cardNumber.replace(/\s+/g, "")),
      expiration_date: expiryDate,
      cvv: cvv,
    };

    const response = await createPaymentMethod(newCard);

    if (successfulStatus(response.status)) {
      onSubmit(response?.data);
      showToast({
        title: "Success",
        message: "Add to cart successfully",
        type: "success",
      });
      closeBottomSheet();
    } else {
      showToast({
        title: "Add card fail",
        message: response?.response?.data,
        type: "error",
      });

      console.log(response?.response?.data);
    }
  };

  const formatCardNumber = (number) => {
    return number
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleExpiryDateChange = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;
    if (cleaned.length >= 3) {
      // Insert a "/" after the first two digits (MM)
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }

    // Limit the length to 5 characters (MM/YY)
    setExpiryDate(formatted.slice(0, 5));
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

      {/* TouchableWithoutFeedback to dismiss keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Text style={styles.title}>Add New Card</Text>

            <Text style={styles.label}>Name on card</Text>
            <TextInput
              style={styles.input}
              placeholder="Nguyen Thuong Huyen"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Card number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 4567 7890 1234"
              keyboardType="numeric"
              maxLength={19}
              value={formatCardNumber(cardNumber)}
              onChangeText={setCardNumber}
            />

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Expiry date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="02/24"
                  keyboardType="numeric"
                  value={expiryDate}
                  onChangeText={handleExpiryDateChange}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="•••"
                  keyboardType="numeric"
                  secureTextEntry
                  value={cvv}
                  maxLength={3}
                  onChangeText={setCvv}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
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
  addButton: {
    paddingVertical: 14,
    backgroundColor: "#0D986A",
    borderRadius: 4,
  },
  addButtonText: {
    textAlign: "center",
    color: "white",
  },
});
