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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IdentifyBottomSheet from "../../components/IdentifyBottomSheet/IdentifyBottomSheet";
import { useFocusEffect } from "@react-navigation/native";
import { classifyImage, detectAndSegment } from "../../api/scanService";
import { plantType } from "../../constant/plantType";
import { successfulStatus } from "../../utils/utils";
import { getPlantByName } from "../../api/plant";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PlantReport = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(route?.params?.image);
  const [responseImage, setResponseImage] = useState(null);
  const [searchedPlant, setSearchedPlant] = useState(null);
  const [identifyReportVisible, setIdentifyReportVisible] = useState(false);
  const [undefinedModal, setUndefinedModal] = useState(false);

  useEffect(() => {
    setSelectedImage(route?.params?.image);
    handleImageUpload();
  }, [route?.params?.image]);

  useEffect(() => {
    handleImageUpload();
  }, [selectedImage]);

  useEffect(() => {
    loadSearchPlant();
  }, [responseImage]);

  const type = useMemo(() => {
    return route.params.type;
  }, [route.params]);

  useEffect(() => {
    setTimeout(() => {
      console.log(route?.params?.type);
      route?.params?.type === "identify" && setIdentifyReportVisible(true);
    }, 1000);
  }, [type]);

  // route?.params?.type

  const loadSearchPlant = async () => {
    const searchPlant = plantType.find(
      (item) => item.vn === responseImage.class_name
    );
    const response = await getPlantByName(searchPlant.plantName);
    if (successfulStatus(response.status)) {
      setSearchedPlant(response?.data[0]);
    } else {
      setUndefinedModal(true);
    }
  };

  const handleImageUpload = async () => {
    // Classify the selected
    try {
      const classificationResult = await classifyImage(selectedImage);
      // const classificationResult = await detectAndSegment(selectedImage);
      console.log(classificationResult);
      setResponseImage(classificationResult);
      // Alert.alert('Classification Result', JSON.stringify(classificationResult, null, 2));
    } catch (error) {
      // Alert.alert('Error', 'Failed to classify image');
      console.error("Classification Error:", error, error?.response);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={responseImage ? responseImage : { uri: selectedImage || "" }}
        // source={require("../../assets/utilsImage/plantReportBackgroundImage.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.containerHeader}>
          <Text style={styles.containerHeaderTitle}>Report</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={navigation.goBack}
          >
            <Icon name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
          {route?.params?.type === "scan" && searchedPlant && (
            <TouchableOpacity
              style={styles.viewDetailButton}
              onPress={() => {
                navigation.navigate("PlantGuide", {
                  plant: {
                    ...searchedPlant,
                    name: searchedPlant.name,
                    img: searchedPlant.img_url[0],
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
        visible={identifyReportVisible}
        onClose={() => {
          setIdentifyReportVisible(false);
        }}
      />
      <Modal visible={undefinedModal} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.layout}
          onPress={() => setUndefinedModal(false)}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.modalContainerTitle}>
            Unable to recognize plant
          </Text>
          <Text style={styles.modalContainerDesciption}>
            The camera cannot recognize the plant, please try again!!
          </Text>
          <TouchableOpacity style={styles.modalContainerButton}>
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
  modalContainer: {
    width: WIDTH * 0.8,
    backgroundColor: "white",
    padding: 20,
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
  },
  modalContainerText: {
    fontSize: 16,
    color: "white",
  },
});

export default PlantReport;
