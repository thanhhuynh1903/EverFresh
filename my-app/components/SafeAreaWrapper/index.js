import React from "react";
import {
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectSaveArea } from "../../redux/selector/selector";

const HEIGHT = Dimensions.get("window").height;

const SafeAreaWrapper = ({ children }) => {
  // const insets = useSafeAreaInsets();
  // const saveAreaColor = useSelector(selectSaveArea);
  // saveAreaColor.color
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        // backgroundColor={saveAreaColor.color}
      />
      {Platform.OS === "android" ? (
        <View style={styles.AndroidSafeArea}>{children}</View>
      ) : (
        <SafeAreaView
          style={{ ...styles.container }}
          edges={["top", "bottom", "left", "right"]}
        >
          {children}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: HEIGHT * 0.06,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default SafeAreaWrapper;
