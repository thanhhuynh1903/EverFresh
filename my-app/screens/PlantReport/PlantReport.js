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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IdentifyBottomSheet from "../../components/IdentifyBottomSheet/IdentifyBottomSheet";
import { useFocusEffect } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PlantReport = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(route?.params?.image);
  const [identifyReportVisible, setIdentifyReportVisible] = useState(false);

  useEffect(() => {
    setSelectedImage(route?.params?.image);
  }, [route?.params?.image]);

  const type = useMemo(() => {
    return route.params.type;
  }, [route.params]);

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    setTimeout(() => {
      console.log(route?.params?.type);
      route?.params?.type === "identify" && setIdentifyReportVisible(true);
    }, 1000);
  }, [type]);

  // route?.params?.type

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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={navigation.goBack}
          >
            <Icon name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
          {route?.params?.type === "scan" && (
            <TouchableOpacity
              style={styles.viewDetailButton}
              onPress={() =>
                navigation.navigate("PlantGuide", {
                  plant: {
                    name: "Lily",
                    img: require("../../assets/homeImg/guidePlant1.png"),
                  },
                })
              }
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
});

export default PlantReport;
