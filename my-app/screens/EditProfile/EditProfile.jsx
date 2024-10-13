import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CountryPicker from "react-native-country-picker-modal";
import DateTimePicker from "@react-native-community/datetimepicker";

import BottomSheetHeader from "../../components/BottomSheetHeader/BottomSheetHeader";
import { selectUser } from "../../redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { successfulStatus } from "../../utils/utils";
import useCustomToast from "../../components/ToastNotification/ToastNotification";
import { updateCurrentUser } from "../../api/user";
import { setUserInfo } from "../../redux/reducers/userReducer";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function EditProfile() {
  const navigation = useNavigation();
  const userRedux = useSelector(selectUser);
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const [name, setName] = useState(userRedux?.user?.name || "");
  const [email, setEmail] = useState(userRedux?.user?.email || "");
  const [image, setImage] = useState(userRedux?.user?.avatar_url || "");
  const [password, setPassword] = useState("********");
  const [dob, setDob] = useState(
    new Date(userRedux?.user?.dob || "1987-12-01")
  );
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker
  const [country, setCountry] = useState(userRedux?.user?.country || "NG");
  const [countryCode, setCountryCode] = useState("NG");

  const handleSaveChanges = async () => {
    const data = {
      name: name,
      dob: dob,
      country: country,
      // gender: "string",
      avatar_url: image,
    };
    const response = await updateCurrentUser(data);
    if (successfulStatus(response.status)) {
      showToast({
        title: "Success",
        message: `Change user information success`,
        type: "success",
      });
      dispatch(setUserInfo(response.data));
    } else {
      showToast({
        title: "Fail",
        message: `Change user information fail`,
        type: "error",
      });
      console.log(response.response?.data);
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDob(selectedDate); // Set the selected date
    }
    // setShowDatePicker(false);
  };

  return (
    <>
      <BottomSheetHeader
        goback={() => {
          navigation.goBack();
        }}
        title={"Editing profile"}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.profileAvt}>
          <Image
            source={{ uri: image || "" }}
            resizeMode="contain"
            style={styles.profileAvtImage}
          />
          <View style={styles.cameraIcon}>
            <Icon name="camera" size={28} color="rgba(45, 116, 20, 0.8)" />
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            editable={false}
          />
        </View>

        {/* Date of Birth Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{dob.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {/* Show Date Picker based on platform */}
          {Platform.OS === "ios" && showDatePicker && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.bottomSheetContainer}>
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={dob}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()} // Restrict future dates
                    textColor="black" // Explicitly set text color for iOS
                  />
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={styles.closePickerButton}
                  >
                    <Text style={styles.closePickerText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {Platform.OS === "android" && showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()} // Restrict future dates
            />
          )}
        </View>

        {/* Country Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country/Region</Text>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter
            onSelect={(country) => {
              setCountry(country.name);
              setCountryCode(country.cca2);
            }}
            containerButtonStyle={styles.countryPicker}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
  },
  profileAvt: {
    position: "relative",
    width: WIDTH * 0.38,
    height: WIDTH * 0.38,
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 500,
    borderColor: "#242760",
  },
  profileAvtImage: {
    width: "98%",
    height: "98%",
    borderRadius: 500,
  },
  cameraIcon: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  inputContainer: {
    width: WIDTH * 0.9,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#009E71",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: WIDTH * 0.9,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closePickerButton: {
    alignItems: "center",
    marginTop: 10,
  },
  closePickerText: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
  },
});
