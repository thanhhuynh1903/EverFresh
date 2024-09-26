import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { formatPrice } from '../../utils/utils';
import BottomSheetHeader from '../../components/BottomSheetHeader/BottomSheetHeader';
import PlantBookingCard from '../../components/PlantBookingCard/PlantBookingCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CartView({ goback }) {
    const navigation = useNavigation();

    const plantList = [
        {
            image: require("../../assets/cart/plant2.png"),
            name: "Watermelon Peperomia",
            price: 170000,
            // bookmark:true
        },
        {
            image: require("../../assets/cart/plant1.png"),
            name: "Peperomia Obtusfolia",
            price: 200000,
        },
        {
            image: require("../../assets/cart/plant5.png"),
            name: "Cactus",
            price: 170000,
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

    const renderCardBooking = (item, key) => {
        return (
            <View style={styles.bookingCard} key={key}>
                <Icon name="checkbox-marked" size={32} color="#8688BC" />
                <PlantBookingCard item={item} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <BottomSheetHeader goback={goback} title={"Your Cart"} />
            <ScrollView style={styles.contentContainer}>
                <View style={styles.cartHeader}>
                    <Text style={styles.cartAmount}>3 items</Text>
                    <TouchableOpacity style={{ ...styles.flexRow, transform: [{ translateX: 20 }] }}>
                        <Icon name="check" size={32} color="#424347" />
                        <Text style={styles.cartHeaderText}>Select All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexRow}>
                        <Image
                            source={require('../../assets/cart/delete.png')}
                            resizeMode="stretch"
                            style={styles.deleteImage}
                        />
                        <Text style={styles.cartHeaderText}>Delete Selected</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {plantList.map((item, key) => renderCardBooking(item, key))}
                </View>
                <View style={styles.bookingInfor}>
                    <View style={styles.bookingInfoImage}>
                        <Image
                            source={require('../../assets/cart/deliveryIcon.png')}
                            resizeMode="stretch"
                            style={styles.bookingInfoImageView}
                        />
                    </View>
                    <View style={styles.bookingInfoRight}>
                        <Text style={styles.bookingInfoRightTitle}>Delivery</Text>
                        <View style={styles.bookingInfoRightStatus}>
                            <View style={styles.bookingInfoRightStatusComplete} />
                        </View>
                        <Text style={styles.bookingInfoRightPrice}>{formatPrice(30000)} VNĐ</Text>
                        <Text style={styles.bookingInfoRightFree}>
                            Order above 1.000.000 VNĐ to get free delivery
                        </Text>
                        <Text style={styles.bookingInfoRightPriceLeft}>Shop for more 505.000 VNĐ</Text>
                    </View>
                </View>
                <View style={styles.bookingInfor}>
                    <View style={styles.bookingInfoImage}>
                        <Image
                            source={require('../../assets/cart/couponIcon.png')}
                            resizeMode="stretch"
                            style={styles.bookingInfoImageView}
                        />
                    </View>
                    <View style={styles.bookingInfoRight}>
                        <Text style={{ ...styles.bookingInfoRightTitle, width: "25%" }}>Apply Coupon</Text>
                        <View style={{ ...styles.bookingInfoRightStatus, width: "40%", height: 2 }}>
                            <View style={{ ...styles.bookingInfoRightStatusComplete, width: "100%", height: 2 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.totalPrice}>
                    <Text style={styles.totalPriceText}>Sub-total:</Text>
                    <Text style={styles.totalPriceText}>495.000 VNĐ</Text>
                </View>
                <View style={styles.totalPrice}>
                    <Text style={styles.saveText}>Saved for later</Text>
                    <Text style={styles.saveText}>6 items</Text>
                </View>
                <View style={styles.savePlantList}>
                    {savePlantList.map((item, key) => <PlantBookingCard item={item} key={key} />)}
                </View>

            </ScrollView >
            <LinearGradient
                colors={['#0B845C', '#0D986A']}  // Set the gradient colors
                start={{ x: 1, y: 0 }}  // Start from the right
                end={{ x: 0, y: 0 }}    // End at the left
                style={styles.bottomCartSheet}
            >
                <TouchableOpacity
                    style={styles.bottomCartSheetContainer}
                    onPress={() => navigation.navigate("Checkout")}
                >
                    <View style={styles.bottomCartSheetContainerLeft}>
                        <Text style={styles.bottomCartSheetContainerRight}>Checkout</Text>
                    </View>
                    <Text style={styles.bottomCartSheetContainerRight}>{formatPrice(668990)} VNĐ</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: HEIGHT,
        width: WIDTH,
        overflow: "visible",
        marginBottom: 100,
        backgroundColor: "#FFFFFF",
        zIndex: 11
    },
    contentContainer: {
        paddingHorizontal: 16
    },
    cartHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12
    },
    cartAmount: {
        fontSize: 13,
        color: "#BBBBBB",
        fontWeight: "regular"
    },
    cartHeaderText: {
        fontSize: 13,
        color: "#3E3E3E",
        fontWeight: "regular"
    },
    bookingInfor: {
        width: WIDTH,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        marginBottom: 24,
    },
    bookingInfoImage: {
        height: 80,
        width: 80,
        // padding: 12,
        borderRadius: 50,
        backgroundColor: "#E3FDF4",
        justifyContent: "center",
        alignItems: "center"
    },
    bookingInfoRight: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 3
    },
    bookingInfoRightTitle: {
        width: "15%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#002140"
    },
    bookingInfoRightStatus: {
        position: "relative",
        width: "30%",
        height: 4,
        backgroundColor: "#BCFAE5",
        marginRight: 12
    },
    bookingInfoRightStatusComplete: {
        width: "80%",
        position: "absolute",
        height: 4,
        left: 0,
        backgroundColor: "#0D986A"
    },
    bookingInfoRightPrice: {
        width: "20%",
        fontSize: 14,
        fontWeight: "bold",
        color: "#002140"
    },
    bookingInfoRightFree: {
        width: "100%",
        fontSize: 12,
        fontWeight: "regular",
        color: "#002140"
    },
    bookingInfoRightPriceLeft: {
        width: "100%",
        fontSize: 12,
        fontWeight: "regular",
        color: "#0D986A"
    },

    bookingCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 12
    },

    // totalPrice
    totalPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24
    },
    totalPriceText: {
        fontSize: 28,
        fontWeight: "semibold",
        color: "#002140"
    },
    saveText: {
        fontSize: 16,
        fontWeight: "medium",
        color: "#0D986A"
    },
    savePlantList: {
        width: WIDTH,
        gap: 12,
        marginBottom: 100,

    },
    // bottomCartSheet
    bottomCartSheet: {
        position: "absolute",
        width: WIDTH,
        flexDirection: "row",
        borderRadius: 50,
        bottom: 24,
    },
    bottomCartSheetContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 24,
        paddingHorizontal: 36,
    },
    bottomCartSheetContainerLeft: {
        flexDirection: "row",
        gap: 24
    },
    bottomCartSheetContainerLeftCartAmount: {
        color: "#FFFFFF",
        opacity: 0.7
    },
    bottomCartSheetContainerRight: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "semibold",
    },

    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
});