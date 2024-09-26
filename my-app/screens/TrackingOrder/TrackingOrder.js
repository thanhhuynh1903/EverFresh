import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, TextInput } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import OrderStatusBar from '../../components/OrderStatusBar/OrderStatusBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const orderStatusList = [
    {
        name: "Order Confirmed",
        date: "Wed, 1 lth July"
    },
    {
        name: "Shipped",
        date: "Wed, 1 lth July"
    },
    {
        name: "Out For Delivery",
        date: "Wed, 1 lth July"
    },
    {
        name: "Delivered ",
        date: "Wed, 1 lth July"
    },
]

export default function TrackingOrder({ route }) {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <View style={{ ...styles.header, backgroundColor: "white" }}>
                <Text style={styles.orderCode}>Order #9876543</Text>
            </View>
            <View style={styles.orderContainer}>
                <View style={styles.orderTime}>
                    <Text style={styles.orderTimeTitle}>Order date:</Text>
                    <Text style={styles.orderTimeValue}>May 16, 2024</Text>
                    <Image
                        source={require("../../assets/cart/deliveryIcon.png")}
                        resizeMode="stretch"
                        style={styles.deliveryIcon}
                    />
                    <Text style={styles.orderTimeExpDate}>Estimated delivery: May 16, 2024</Text>
                </View>
                <View style={styles.orderStatusBar}>
                    <OrderStatusBar orderStatusList={orderStatusList} />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        overflow: "visible",
        marginBottom: 100,
        backgroundColor: "#FFFFFF",
    },
    orderContainer: {
        paddingHorizontal: 18,
    },
    orderTime: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 12,
        gap: 12,
    },
    orderTimeTitle: {
        fontSize: 9,
        fontWeight: "regular",
        color: "#667085"
    },
    orderTimeValue: {
        fontSize: 11,
        fontWeight: "semibold",
        color: "#1D2939",
        paddingRight: 12,
        borderRightWidth: 1,
        borderColor: "#D0D5DD"
    },
    deliveryIcon: {
        height: "100%",
    },
    orderTimeExpDate: {
        fontSize: 11,
        fontWeight: "semibold",
        color: "#12B76A"
    },
    orderStatusBar: {
        width: "100%",
        borderWidth: 1,
        justifyContent: "center",
        alignItems:"center"
    },

    header: {
        position: "relative",
        width: WIDTH,
        // height: HEIGHT * 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        paddingVertical: 20,
        paddingTop: 55,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,

        shadowColor: 'rgba(0,0,0,0.1)',  // Black color
        shadowOffset: { width: 0, height: -4 },  // X: 0, Y: -4
        shadowOpacity: 0.1,  // 10% opacity
        shadowRadius: 14,    // Blur: 14
        elevation: 3,
    },
    orderCode: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#22190C"
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    }
});