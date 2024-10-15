import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const AddNewCollection = ({ visible, onSubmit }) => {
  const [collectionName, setCollectionName] = useState("");

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={styles.layout}
        // onPress={() => setUndefinedModal(false)}
      />
      <View style={styles.modalContainer}>
        <Text style={styles.modalContainerTitle}>Add new collection</Text>
        <TextInput
          style={styles.modalContainerDesciption}
          value={collectionName}
          onChangeText={setCollectionName}
          placeholder="Enter collection name"
          placeholderTextColor={"black"}
        />
        <TouchableOpacity
          style={styles.modalContainerButton}
          onPress={() => onSubmit(collectionName)}
        >
          <Text style={styles.modalContainerText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  imageBackground: {
    width: WIDTH,
    height: HEIGHT,
  },
  containerHeader: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    paddingHorizontal: 50,
    marginVertical: 20,
    zIndex: 10,
  },
  containerHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: "5%",
  },
  containerBody: {
    width: WIDTH,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "20%",
  },
  viewDetailButton: {
    width: "80%",
    backgroundColor: "#0D986A",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetailText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  //modalContainer
  layout: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalContainer: {
    position: "absolute",
    top: HEIGHT * 0.4,
    left: WIDTH * 0.1,
    right: WIDTH * 0.1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    gap: 24,
  },
  modalContainerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainerDesciption: {
    fontSize: 14,
    color: "#475467",
    borderRadius: 6,
    borderWidth: 1,
    padding: 12,
  },
  modalContainerButton: {
    width: "100%",
    padding: 20,
    backgroundColor: "#0D986A",
    borderRadius: 12,
    justifyContent: "center",
  },
  modalContainerText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default AddNewCollection;
