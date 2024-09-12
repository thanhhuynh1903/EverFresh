import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const SafeAreaWrapper = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  },
});

export default SafeAreaWrapper;
