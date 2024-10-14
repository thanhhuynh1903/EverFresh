import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  LogBox,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IdentifyBottomSheet from "../../components/IdentifyBottomSheet/IdentifyBottomSheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { classifyImage, detectAndSegment } from "../../api/scanService";
import { plantType } from "../../constant/plantType";
import { successfulStatus } from "../../utils/utils";
import { getPlantByName } from "../../api/plant";
import * as FileSystem from "expo-image-picker";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PlantReport = ({ route }) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(route?.params?.imageUri);
  const [responseImage, setResponseImage] = useState(null);
  const [searchedPlant, setSearchedPlant] = useState(null);
  const [identifyReportVisible, setIdentifyReportVisible] = useState(false);
  const [undefinedModal, setUndefinedModal] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs(); // Disable all logs
    return () => LogBox.ignoreAllLogs(false); // Re-enable logs when the component unmounts
  }, []);

  useEffect(() => {
    setSelectedImage(route?.params?.imageUri);
  }, [route?.params]);

  useEffect(() => {
    if (selectedImage) {
      handleImageUpload();
    }
  }, [selectedImage]);

  useEffect(() => {
    if (responseImage) {
      loadSearchPlant();
    }
  }, [responseImage]);

  useEffect(() => {
    type === "identify" && searchedPlant && setIdentifyReportVisible(true);
  }, [searchedPlant]);

  // type

  const type = useMemo(() => {
    return route?.params?.cameraType;
  }, [route?.params]);

  const loadSearchPlant = async () => {
    const searchPlant = plantType.find(
      (item) => item.vn === responseImage.class_name
    );
    const response = await getPlantByName(searchPlant.plantName);
    if (successfulStatus(response.status)) {
      setSearchedPlant(response?.data[0]);
    } else {
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) return;

      // const fileInfo = await FileSystem.getInfoAsync(selectedImage);
      // if (!fileInfo.exists) {
      //   console.log(fileInfo);

      //   console.error("File not found at path:", selectedImage);
      //   return;
      // }
      // Call the classifyImage function
      const classificationResult = await classifyImage(selectedImage);

      // Handle classification result
      if (classificationResult?.class_id === -1) {
        setUndefinedModal(true);
        return;
      } else {
        setResponseImage(classificationResult);
      }
    } catch (error) {
      console.error("Classification Error:", error, error?.response);
    }
  };

  const handleGoback = () => {
    setUndefinedModal(false);
    setIdentifyReportVisible(false);
    setSearchedPlant(null);
    setResponseImage(null);
    setSelectedImage(undefined);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: selectedImage || "" }}
        // source={require("../../assets/utilsImage/plantReportBackgroundImage.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.containerHeader}>
          <Text style={styles.containerHeaderTitle}>Report</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleGoback}>
            <Icon name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
          {type === "scan" && !undefinedModal && (
            <TouchableOpacity
              style={styles.viewDetailButton}
              onPress={() => {
                navigation.navigate("PlantGuide", {
                  plant: {
                    ...searchedPlant,
                    name: searchedPlant?.name,
                    img: searchedPlant?.img_url[0],
                    uri: true,
                  },
                });
              }}
            >
              <Text style={styles.viewDetailText}>View more tips</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
      <IdentifyBottomSheet
        plant={searchedPlant}
        visible={identifyReportVisible}
        onClose={() => {
          setIdentifyReportVisible(false);
        }}
      />
      <Modal visible={undefinedModal} animationType="fade" transparent={true}>
        <View
          style={styles.layout}
          // onPress={() => setUndefinedModal(false)}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.modalContainerTitle}>
            Unable to recognize plant
          </Text>
          <Text style={styles.modalContainerDesciption}>
            The camera cannot recognize the plant, please try again!!
          </Text>
          <TouchableOpacity
            style={styles.modalContainerButton}
            onPress={handleGoback}
          >
            <Text style={styles.modalContainerText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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

export default PlantReport;
