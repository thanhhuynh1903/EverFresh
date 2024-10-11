import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera"; // Use Camera instead of CameraView
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ScanCamera = ({ navigation, route }) => {
  const [facing, setFacing] = useState("by");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState(route?.params?.type || "scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null); // Create a reference for the Camera

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    setCameraType(route?.params?.type || "scan");
  }, [route?.params?.type]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setSelectedImage(photo.uri); // Optionally display the captured image
      console.log("type ", cameraType);

      navigation.navigate("PlantReport", {
        image: photo.uri,
        type: cameraType,
      }); // Navigate with the image
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [3, 12],
      quality: 1,
    });

    if (!result.canceled && result?.assets && result?.assets[0]) {
      setSelectedImage(result?.assets[0]?.uri); // Set image URI to display
      navigation.navigate("PlantReport", { image: result?.assets[0]?.uri });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef} // Assign the reference to Camera
        style={styles.camera}
        facing={facing}
        // flash={"auto"}
      >
        {/* {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )} */}
        <View style={styles.buttonContainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderTitle}>
              {cameraType === "scan"
                ? "Scanner"
                : cameraType === "identify"
                ? "Identify the plant"
                : "AR mode"}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={navigation.goBack}
            >
              <Icon name="close" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.lineScan}>
              <View style={styles.line} />
              <View
                style={{
                  ...styles.borderScan,
                  left: 0,
                  top: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              />
              <View
                style={{
                  ...styles.borderScan,
                  right: 0,
                  top: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
              />
              <View
                style={{
                  ...styles.borderScan,
                  left: 0,
                  bottom: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
              />
              <View
                style={{
                  ...styles.borderScan,
                  right: 0,
                  bottom: 0,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              />
            </View>
          </View>
          <View style={styles.captureButtonContainer}>
            <View style={styles.captureButtonWrapper}>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={pickImage}
              >
                <Icon name="image-outline" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.navigationButton, width: WIDTH * 0.1 }}
              >
                <Text
                  style={styles.navigationText}
                  onPress={() => {
                    setCameraType(
                      cameraType === "scan"
                        ? "identify"
                        : cameraType === "identify"
                        ? "AR"
                        : "scan"
                    );
                  }}
                >
                  {cameraType === "scan"
                    ? "ID"
                    : cameraType === "identify"
                    ? "AR"
                    : "SC"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.captureButton}
              >
                <View style={styles.captureButtonOutline} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.navigationButton, width: WIDTH * 0.1 }}
              >
                <Text
                  style={styles.navigationText}
                  onPress={() => {
                    setCameraType(
                      cameraType === "scan"
                        ? "AR"
                        : cameraType === "identify"
                        ? "scan"
                        : "identify"
                    );
                  }}
                >
                  {cameraType === "scan"
                    ? "AR"
                    : cameraType === "identify"
                    ? "SC"
                    : "ID"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={toggleCameraFacing}
              >
                <Icon name="sync" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
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
    zIndex: 5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -(WIDTH * 0.15) }],
  },
  lineScan: {
    position: "relative",
    width: 300,
    height: 300,
  },
  borderScan: {
    width: 80,
    height: 80,
    position: "absolute",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "white",
  },
  line: {
    position: "absolute",
    right: "10%",
    left: "10%",
    top: "50%",
    height: 2,
    backgroundColor: "white",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: "10%",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    justifyContent: "space-between",
    zIndex: 999,
  },
  captureButtonWrapper: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  captureButton: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    borderRadius: 50,
    backgroundColor: "#fff",
    // borderWidth: 1,
  },
  captureButtonOutline: {
    position: "absolute",
    width: WIDTH * 0.24,
    height: WIDTH * 0.24,
    bottom: -(WIDTH * 0.02),
    left: -(WIDTH * 0.02),
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  navigationButton: {
    backgroundColor: "rgba(196,196,196,0.2)",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationText: {
    color: "white",
    textAlign: "center",
  },
});

export default ScanCamera;
