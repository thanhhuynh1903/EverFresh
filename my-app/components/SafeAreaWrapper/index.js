import React from "react";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SafeAreaWrapper = ({ children }) => {
  // const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
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
    paddingTop: 50,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default SafeAreaWrapper;
