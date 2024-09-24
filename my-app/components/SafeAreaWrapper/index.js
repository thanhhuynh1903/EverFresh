import React from 'react';
import { SafeAreaView, StyleSheet,Platform,View } from 'react-native';
import { useState } from 'react';

const SafeAreaWrapper = ({ children }) => {
  
  return Platform.OS === "android" ?  
  <View style={styles.AndroidSafeArea}>{children}</View>
  :
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    // marginTop: Platform.OS === 'android' ? 25 : 0
  }
});

export default SafeAreaWrapper;
