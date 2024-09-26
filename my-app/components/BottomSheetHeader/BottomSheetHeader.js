import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function BottomSheetHeader({ goback, title, backgroundColor }) {
    return (
        <View style={{ ...styles.header, backgroundColor: backgroundColor ? backgroundColor : "white" }}>
            <TouchableOpacity style={styles.iconstyle} onPress={goback}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.fetureList}>
                <Text style={styles.title}>{title || "Your Cart"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
        width: WIDTH,
        height: HEIGHT * 0.05,
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        padding: 12,
        paddingVertical: 50,
        backgroundColor: "#FFFFFF",
        zIndex: 10,
        borderBottomWidth: 1,

        shadowColor: 'rgba(0,0,0,0.1)',  // Black color
        shadowOffset: { width: 0, height: -4 },  // X: 0, Y: -4
        shadowOpacity: 0.1,  // 10% opacity
        shadowRadius: 14,    // Blur: 14
        elevation: 3,
    },
    iconstyle: {
        position: "absolute",
        width: WIDTH * 0.15,
        height: HEIGHT * 0.045,
        resizeMode: 'contain',
        left: "10%",
        bottom: 0,
        fontSize: 17,
        color: "#0D986A",
        fontWeight: "regular"
    },
    fetureList: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: HEIGHT * 0.05,
        gap: 12,
        marginRight: 12,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        color: "#0D986A",
        fontWeight: "bold"
    }
});
