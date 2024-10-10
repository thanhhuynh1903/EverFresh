import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createDeliveryInformation,
  deleteDeliveryInformation,
  updateDeliveryInformation,
} from "../../api/delivery";
import { successfulStatus } from "../../utils/utils";

const DeliveryInfoModal = ({ visible, onClose, onSubmit, deliveryObject }) => {
  const [phoneNumber, setPhoneNumber] = useState(
    deliveryObject?.phone_number || ""
  );
  const [address, setAddress] = useState(deliveryObject?.address || "");
  const [addressDetail, setAddressDetail] = useState(
    deliveryObject?.address_detail || ""
  );

  useEffect(() => {
    setPhoneNumber(deliveryObject?.phone_number || "");
    setAddress(deliveryObject?.address || "");
    setAddressDetail(deliveryObject?.address_detail || "");
  }, [deliveryObject]);

  const createDeliveryInfo = async () => {
    const response = await createDeliveryInformation({
      phone_number: phoneNumber,
      address: address,
      address_detail: addressDetail,
    });

    if (successfulStatus(response.status)) {
      onSubmit(response?.data);
      onClose();
    }
  };

  const UpdateDeliveryInfo = async () => {
    const response = await updateDeliveryInformation(deliveryObject._id, {
      phone_number: phoneNumber,
      address: address,
      address_detail: addressDetail,
    });

    if (successfulStatus(response.status)) {
      onSubmit(response?.data, "update");
      onClose();
    }
  };

  const deleteDeliveryInfo = async () => {
    const response = await deleteDeliveryInformation(deliveryObject._id);

    if (successfulStatus(response.status)) {
      onSubmit(response?.data, "delete");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {deliveryObject ? "Edit" : "Add New"} Address
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Detail</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address detail"
              value={addressDetail}
              onChangeText={setAddressDetail}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            {deliveryObject && (
              <TouchableOpacity
                style={{ ...styles.saveButton, backgroundColor: "red" }}
                onPress={deleteDeliveryInfo}
              >
                <Text style={styles.saveButtonText}>Delete</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={deliveryObject ? UpdateDeliveryInfo : createDeliveryInfo}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#0D986A",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DeliveryInfoModal;
