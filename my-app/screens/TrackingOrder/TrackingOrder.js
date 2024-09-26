import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, TextInput } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OrderStatusBar from '../../components/OrderStatusBar/OrderStatusBar';
import { formatPrice } from '../../utils/utils';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const orderStatusList = [
    {
        name: "Order Confirmed",
        date: "Wed, 1 lth July",
        checked: true
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

const savePlantList = [
    {
        image: require("../../assets/cart/plant2.png"),
        name: "Watermelon Peperomia",
        price: 170000,
        bookmark: true
    },
    {
        image: require("../../assets/cart/plant1.png"),
        name: "Peperomia Obtusfolia",
        price: 200000,
        bookmark: true
    },
    {
        image: require("../../assets/cart/plant5.png"),
        name: "Cactus",
        price: 170000,
        bookmark: true
    },
]

export default function TrackingOrder({ route }) {
    const navigation = useNavigation();

    const renderBookingCard = (item, key) => {
        return (
            <TouchableOpacity style={styles.bookingCardContainer} activeOpacity={1} onPress={item?.onPress && item?.onPress} key={key}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item?.image}
                        resizeMode="stretch"
                        style={styles.image}
                    />
                </View>

                <View style={styles.center}>
                    <View style={styles.centerFuncional}>
                        <Text style={styles.centerTitle}>{item?.name}</Text>
                        <Text style={styles.centerPrice}>{formatPrice(item?.price || 0)} VNĐ</Text>
                    </View>
                    <View style={{ ...styles.centerFuncional, justifyContent: "flex-start" }}>
                        <Text style={styles.amount}>Air Purifier</Text>
                        <View style={styles.split} />
                        <Text style={styles.amount}>3-4 weeks</Text>
                        <View style={styles.split} />
                        <Text style={styles.amount}>35 cm</Text>
                        <Text
                            style={{
                                ...styles.amount,
                                bottom: 0,
                                right: 0
                            }}
                        >
                            Oty: 1
                        </Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }

    return (
        <ScrollView style={styles.container}>
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
                <View style={styles.dashLine} />
                {savePlantList.map((item, key) => renderBookingCard(item, key))}
                <View style={styles.dashLine} />
                <View style={styles.orderInfo}>
                    <View style={styles.orderInfoTab}>
                        <Text style={styles.orderInfoTabTitle}>Payment</Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.orderInfoTabText}>Visa **56</Text>
                            <Image
                                source={require("../../assets/utilsImage/Payment method icon.png")}
                            />
                        </View>
                    </View>
                    <View style={styles.orderInfoTab}>
                        <Text style={styles.orderInfoTabTitle}>Delivery</Text>
                        <Text style={styles.orderInfoTabText}>Address</Text>
                        <Text style={{
                            ...styles.orderInfoTabText,
                            fontWeight: "medium",
                            fontSize: 12
                        }}>Thuong Huyen - 0979084700 B10-12, chung cu 9View So 1, duong So 1, PLB, TP.TD, TP.HCM</Text>
                    </View>
                </View>
                <View style={styles.dashLine} />
                <View style={styles.orderInfo}>
                    <View style={styles.orderInfoTab}>
                        <Text style={styles.orderInfoTabTitle}>Need Help</Text>
                        <View style={{ ...styles.flexRow, gap: 4 }}>
                            <Image
                                source={require("../../assets/utilsImage/info-circle.png")}
                            />
                            <Text style={styles.orderInfoTabText}>Order Issues</Text>
                            <Image
                                source={require("../../assets/utilsImage/VectorArrow.png")}
                            />
                        </View>
                        <View style={{ ...styles.flexRow, gap: 4 }}>
                            <Image
                                source={require("../../assets/utilsImage/truck-time.png")}
                            />
                            <Text style={styles.orderInfoTabText}>Delivery Info</Text>
                            <Image
                                source={require("../../assets/utilsImage/VectorArrow.png")}
                            />
                        </View>
                        <View style={{ ...styles.flexRow, gap: 4 }}>
                            <Image
                                source={require("../../assets/utilsImage/box-remove.png")}
                            />
                            <Text style={styles.orderInfoTabText}>Returns</Text>
                            <Image
                                source={require("../../assets/utilsImage/VectorArrow.png")}
                            />
                        </View>
                    </View>
                    <View style={{ ...styles.orderInfoTab, marginBottom: 120 }}>
                        <Text style={styles.orderInfoTabTitle}>Delivery</Text>
                        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginBottom: 12 }}>
                            <Text style={{ ...styles.orderInfoTabText, fontSize: 14, fontWeight: "medium", color: "#475467" }}>Subtotal</Text>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>{formatPrice(495000)} VNĐ</Text>
                        </View>
                        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginBottom: 12 }}>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>Discount</Text>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>{formatPrice(0)} VNĐ</Text>
                        </View>
                        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginBottom: 12 }}>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>Delivery</Text>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>{formatPrice(30000)} VNĐ</Text>
                        </View>
                        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginBottom: 12 }}>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>Fee</Text>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>{formatPrice(0)} VNĐ</Text>
                        </View>
                        <View style={{ width: "100%", borderBottomWidth: 1, borderStyle: "dashed", marginBottom: 6 }} />
                        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginBottom: 12 }}>
                            <Text style={{ ...styles.orderInfoTabText, color: "#475467" }}>Total</Text>
                            <Text style={{ ...styles.orderInfoTabText, color: "#1D2939", fontSize: 17, fontWeight: "bold" }}>{formatPrice(525000)} VNĐ</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        overflow: "visible",
        backgroundColor: "#FFFFFF",
    },
    orderContainer: {
        width: "100%",
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
        width: "90%",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 28
    },
    dashLine: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#D0D5DD",
        marginVertical: 18
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

    bookingCardContainer: {
        height: HEIGHT * 0.10,
        width: WIDTH,
        overflow: "visible",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        marginBottom: 12
        // justifyContent: "space-between"
    },
    imageContainer: {
        width: "22%",
        height: "100%",
        padding: 16,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#D0D5DD"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    center: {
        width: "70%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
        padding: 12
    },
    centerFuncional: {
        position: "relative",
        width: "100%",
        flexDirection: "row",
        // flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12
    },
    funcionalButton: {
        borderWidth: 2,
        borderRadius: 8
    },
    centerTitle: {
        fontSize: 16,
        fontWeight: "regular",
        color: "#344054"
    },
    centerStock: {
        fontSize: 14,
        fontWeight: "regular",
        color: "#DB8B00"
    },
    amount: {
        fontSize: 11,
        fontWeight: "regular",
        color: "#344054"
    },
    split: {
        marginHorizontal: 2,
        height: 18,
        width: 2,
        backgroundColor: "#D0D5DD"
    },
    centerPrice: {
        fontSize: 14,
        fontWeight: "semibold",
        color: "#1D2939"
    },

    orderInfo: {
        flexDirection: "row"
    },
    orderInfoTab: {
        width: "50%",
    },
    orderInfoTabTitle: {
        fontSize: 14,
        fontWeight: "medium",
        marginBottom: 12
    },
    orderInfoTabText: {
        fontSize: 12,
        fontWeight: "medium",
        color: "#667085"
    },

    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    }
});