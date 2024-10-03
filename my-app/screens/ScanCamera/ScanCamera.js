import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera"; // Use Camera instead of CameraView
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ScanCamera = ({ navigation }) => {
  const [facing, setFacing] = useState("by");
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null); // Create a reference for the Camera

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
      console.log(photo); // Log the photo object
      setSelectedImage(photo.uri); // Optionally display the captured image
      navigation.navigate("PlantReport", { image: photo.uri }); // Navigate with the image
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef} // Assign the reference to Camera
        style={styles.camera}
        type={facing}
      >
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderTitle}>Scanner</Text>
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
                onPress={takePicture}
                style={styles.captureButton}
              >
                <View style={styles.captureButtonOutline} />
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
  },
  buttonContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
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
    bottom: "6%",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    zIndex: 999,
  },
  captureButtonWrapper: {
    position: "relative",
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
    // borderWidth: 1,
  },
  captureButtonOutline: {
    position: "absolute",
    width: 85,
    height: 85,
    bottom: -7.5,
    left: -7.5,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

export default ScanCamera;
