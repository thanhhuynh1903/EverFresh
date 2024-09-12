import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'

export default function LogoCorner() {
  return (
      <Image
            source={require("../../assets/img/logo.png")}
            style={styles.iconstyle}
          />
  )
}
const styles = StyleSheet.create({
    iconstyle: {
        width: 110.4,
        height: 70,
        resizeMode: 'contain',
    },
  });