import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../CustomButton";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const Modal = ({ navigation, modevisible, onClose }) => {
  const [isVisible, setIsVisible] = useState(modevisible);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsVisible(modevisible);
  }, [modevisible]);

  const toggleOverlayClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlayClose}>
        <View style={[styles.overlay, { height: "full" }]}>
          <View style={styles.overlayHeader}>
            <View style={styles.headerModal}>
              <View style={styles.iconStyle}>
                <Icon name="login" size={25} color="black" />
              </View>
              <View style={styles.iconStyleClose}>
                <Icon
                  name="close"
                  size={25}
                  color="black"
                  onPress={toggleOverlayClose}
                />
              </View>
            </View>
            <Text style={styles.titleText}>Our private policy</Text>
            <Text style={styles.subtitleText}>
              Please read our policy carefully to know more about feature and
              function of us
            </Text>
          </View>
          <View style={styles.content}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollViewContent}
            >
              <Text>
                A processing agreement is a contractual agreement between a data
                controller and a data processor that sets out the rules and
                parameters for how collected data is to be processed. It is
                required for data processors that must comply with the GDPR to
                have a processing agreement in place with... A processing
                agreement is a contractual agreement between a data controller
                and a data processor that sets out the rules and parameters for
                how collected data is to be processed. It is required for data
                processors that must comply with the GDPR to have a processing
                agreement in place with... A processing agreement is a
                contractual agreement between a data controller and a data
                processor that sets out the rules and parameters for how
                collected data is to be processed. It is required for data
                processors that must comply with the GDPR to have a processing
                agreement in place with...
              </Text>
            </ScrollView>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={(newValue) => setIsChecked(newValue)}
            />
            <Text style={styles.checkboxLabel}>
              I have read policy carefully.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPressName={"packageplan"}
              navigation={navigation}
              style={styles.button}
              onPress={toggleOverlayClose}
            >
              <Text style={styles.signInButtonText}>Accept</Text>
            </CustomButton>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={toggleOverlayClose}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    borderRadius: 20,
    width: "80%",
    padding: 5,
  },
  overlayHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconStyle: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#D8DADC",
    padding: 10,
    borderRadius: 10,
  },
  iconStyleClose: {
    position: "absolute",
    top: 10,
    left: 140,
    zIndex: 5,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  subtitleText: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 14,
  },
  content: {
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 20,
    padding: 10,
    maxHeight: 200, // Limit height for ScrollView
    marginBottom: 10, // Adjust margin as needed
  },
  scrollViewContent: {
    paddingBottom: 10, // Padding at the bottom of ScrollView content
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  declineButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  declineText: {
    color: "#D0D5DD",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Space below checkbox
  },
  checkboxLabel: {
    fontSize: 14,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Modal;
