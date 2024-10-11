import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addToCollections } from "../../api/collection";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const savedPlantNeeded = [
  {
    name: "Height",
    value: "Small",
    icon: require("../../assets/savedPlant/Ruler.png"),
    backgroundColor: "#EEF7E8",
    color: "#4B8364",
  },
  {
    name: "Water",
    value: "333ml",
    icon: require("../../assets/savedPlant/Vector.png"),
    backgroundColor: "#E6EAFA",
    color: "#7C95E4",
  },
  {
    name: "Light",
    value: "Normal",
    icon: require("../../assets/savedPlant/Sun.png"),
    backgroundColor: "#FCF1E3",
    color: "#E6B44C",
  },
  {
    name: "Humidity",
    value: "56%",
    icon: require("../../assets/savedPlant/Temprature.png"),
    backgroundColor: "#F8E8F8",
    color: "#C390E6",
  },
];

const savedPlantTypes = ["Indoor", "Pet friendly", "Papaveraceae"];

export default function IdentifyBottomSheet({ visible, onSubmit, onClose }) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [descriptionReadmore, setDescriptionReadmore] = useState(false);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

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

  const handleAddToCollection = async (item) => {
    closeBottomSheet();
    navigation.navigate("Galery");
    // const response = await addToCollections(item.product?._id);
    // if (response.status === 201) {
    //   showToast({
    //     title: "Success",
    //     message: (
    //       <View
    //         style={{
    //           width: WIDTH * 0.75,
    //           flex: 1,
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <Text>Add to collection successfully</Text>
    //         <TouchableOpacity
    //           onPress={() => {
    //             setChooseCollectionVisible(true);
    //           }}
    //         >
    //           <Text style={{ color: "#4287f5", fontWeight: "bold" }}>
    //             Manager
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     ),
    //     type: "success",
    //     // position: "bottom",
    //   });
    //   await dispatch(getGaleryThunk()).then((response) => {
    //     dispatch(getAllPlantsFromGalleryThunk(response.payload));
    //   });
    // } else {
    //   showToast({
    //     title: "Fail",
    //     message: `Add plant to collection fail`,
    //     type: "error",
    //   });
    // }
  };

  const renderPlantType = (item, key) => {
    return (
      // <View style={styles.plantTypeCard} >
      <Text style={styles.plantTypeName} key={key}>
        {item}
      </Text>
      // </View>
    );
  };

  const renderPlantNeeded = (item, key) => {
    return (
      <View
        style={{
          ...styles.plantNeedCard,
          paddingLeft: key % 2 === 0 ? 0 : "15%",
        }}
        key={key}
      >
        <View
          style={{
            ...styles.plantNeedLeft,
            backgroundColor: item.backgroundColor,
          }}
        >
          <Image source={item?.icon} style={styles.plantNeedImage} />
        </View>
        <View style={styles.plantNeedRight}>
          <Text style={{ ...styles.plantNeedName, color: item.color }}>
            {item.name}
          </Text>
          <Text style={styles.plantNeedValue}>{item.value}</Text>
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
            <View style={{ ...styles.flexRow, gap: 12 }}>
              <Icon name="checkbox-marked-circle" size={30} color="#61AF2B" />
              <Text
                style={{
                  //   fontWeight: "bold",
                  //   fontSize: 30,
                  color: "#61AF2B",
                }}
              >
                Hurray, we identified the plant!
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                marginVertical: 18,
              }}
            >
              Papaver Somniferum
            </Text>
            <View style={styles.plantType}>
              {savedPlantTypes.map((item, key) =>
                renderPlantType(item, item + key)
              )}
            </View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Description
            </Text>
            <Text style={styles.descriptionCre}>
              From Wikipedia, the free encyclopedia
            </Text>
            <Text
              style={styles.descriptionDetail}
              numberOfLines={descriptionReadmore ? 0 : 5}
            >
              Ginkgo biloba first appeared over 290 million years ago, and
              fossils very similar to the living species, back to the Middle
              Jurassic epoch approximately 170 million years ago. The tree was
              cultivated early in human history and remains commonly planted,
              and is widely regarded as a living fossil....
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.descriptionReadmore}
                onPress={() => setDescriptionReadmore(!descriptionReadmore)}
              >
                {!descriptionReadmore ? "Read more" : "Hidden"}
              </Text>
            </TouchableOpacity>

            <View style={styles.savedPlantNeeded}>
              {savedPlantNeeded.map((item, key) =>
                renderPlantNeeded(item, key)
              )}
            </View>

            <TouchableOpacity
              style={{
                ...styles.flexRow,
                ...styles.addButton,
                justifyContent: "center",
              }}
              onPress={handleAddToCollection}
            >
              <Icon name="bookmark-outline" size={30} color="white" />
              <Text style={styles.addButtonText}>Save this plant</Text>
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

  descriptionDetail: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#515151",
  },
  descriptionCre: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#8C8C8C",
    marginVertical: 8,
  },
  descriptionReadmore: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
    transform: [{ translateY: -6 }],
    textAlign: "right",
    marginVertical: 12,
  },

  // plantType
  plantType: {
    width: WIDTH,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
    // justifyContent: "center",
  },
  plantTypeName: {
    color: "#696969",
    fontWeight: "medium",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    margin: 8,
    marginRight: 16,
    marginLeft: 0,
    backgroundColor: "#F0F3F6",
  },

  // savedPlantNeeded
  savedPlantNeeded: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  plantNeedCard: {
    width: "50%",
    flexDirection: "row",
    marginBottom: 12,
  },
  plantNeedLeft: {
    width: 58,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  plantNeedRight: {
    paddingLeft: 12,
  },
  plantNeedName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  plantNeedValue: {
    fontSize: 18,
    fontWeight: "medium",
  },
  savedPlantImage: {
    fontSize: 20,
    fontWeight: "medium",
    textAlign: "center",
    marginBottom: 12,
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
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
