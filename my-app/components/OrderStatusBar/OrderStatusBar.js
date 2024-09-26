import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, TextInput } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function OrderStatusBar(route) {

    const renderDot = (item) => {
        return (
            <View style={styles.dot}>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <View style={styles.completerBar} />
                <View style={styles.dotList}>
                    {route?.orderStatusList?.map(item => renderDot(item))}
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
    statusBar: {
        position: "relative",
        width: "80%",
        height: 10,
        borderRadius: 10,
        backgroundColor: "#D0D5DD",
    },
    completerBar: {
        position: "absolute",
        height: 10,
        borderRadius: 10,
        backgroundColor: "#12B76A",
    },
    dotList: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: "#12B76A",
        transform: [{ translateY: -5 }]
    },

    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    }
});