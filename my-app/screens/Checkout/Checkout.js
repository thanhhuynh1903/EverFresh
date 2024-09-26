import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import BottomSheetHeader from '../../components/BottomSheetHeader/BottomSheetHeader';
import PlantBookingCard from '../../components/PlantBookingCard/PlantBookingCard';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Checkout({ route }) {
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

    return (
        <View style={styles.container}>
            <BottomSheetHeader goback={() => navigation.goBack()} title={"Checkout"} />
            <ScrollView style={styles.contentContainer}>
                <View style={styles.plantList}>
                    {plantList.map((item, key) => <PlantBookingCard item={item} key={key} />)}
                </View>
                <View style={styles.totalPrice}>
                    <Text style={styles.totalPriceText}>Sub-total:</Text>
                    <Text style={styles.totalPriceText}>495.000 VNĐ</Text>
                </View>
                <View style={styles.shippingAddress}>
                    <Text style={styles.shippingAddressTitle}>Shipping address</Text>
                    <TouchableOpacity style={styles.shippingAddressDetail}>
                        <View style={styles.shippingAddressDetailLeft}>
                            <Text style={styles.shippingAddressDetailLeftText}>Thuong Huyen - 0979084700</Text>
                            <Text style={styles.shippingAddressDetailLeftText}>B10-12, chung cu 9View So 1, duong So 1, PLB, TP.TD, TP.HCM</Text>
                        </View>
                        <View style={styles.shippingAddressDetailRight}>
                            <Icon name="circle-slice-8" size={32} color="#8688BC" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shippingAddressChange}>
                        <Text style={styles.shippingAddressChangetText}>Change</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.proceedButton}
                    onPress={() => { navigation.navigate("Payment") }}
                >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>

            </ScrollView >
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
    plantList: {
        width: WIDTH,
    },
    totalPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 36,
    },
    totalPriceText: {
        fontSize: 28,
        fontWeight: "semibold",
        color: "#002140"
    },
    shippingAddress: {
        width: WIDTH,
        paddingHorizontal: 24,
        paddingVertical: 36,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#F5F5F5",
    },
    shippingAddressTitle: {
        fontSize: 22,
        fontWeight: "regular",
        color: "#424347",
        marginBottom: 24
    },
    shippingAddressDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    shippingAddressDetailLeft: {
        width: "85%"
    },
    shippingAddressDetailRight: {
        width: "15%"
    },
    shippingAddressChange: {
        marginTop: 12,
    },
    shippingAddressChangetText: {
        fontSize: 14,
        fontWeight: "regular",
        color: "#0D986A",
    },
    proceedButton: {
        // width: "WIDTH",
        marginHorizontal: 28,
        paddingVertical: 14,
        backgroundColor: "#0D986A",
        borderRadius: 4
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});