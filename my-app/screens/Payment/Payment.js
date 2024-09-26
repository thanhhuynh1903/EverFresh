import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from '@gorhom/bottom-sheet';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Payment({ route }) {
    const navigation = useNavigation();
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    const bottomSheetRef = useRef(null);

    // Define snap points
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setBottomSheetVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ ...styles.header, backgroundColor: "white" }}>
                <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={32} color="#424347" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.shippingAddress}>
                    <Text style={styles.shippingAddressTitle}>Shipping address</Text>
                    <View style={styles.shippingAddressDetail}>
                        <View style={styles.shippingAddressDetailLeft}>
                            <Text style={styles.shippingAddressDetailLeftText}>Thuong Huyen - 0979084700</Text>
                            <Text style={styles.shippingAddressDetailLeftText}>B10-12, chung cu 9View So 1, duong So 1, PLB, TP.TD, TP.HCM</Text>
                        </View>
                        <View style={styles.shippingAddressDetailRight}>
                            <Icon name="circle-slice-8" size={32} color="#8688BC" />
                        </View>
                    </View>
                    <View style={styles.shippingAddressChange}>
                        <Text style={styles.shippingAddressChangetText}>Change</Text>
                    </View>
                </View>
                <View style={styles.paymentTitle}>
                    <Text style={styles.paymentTitleText}>Payment </Text>
                    <TouchableOpacity
                        style={styles.flexRow}
                        onPress={() => { bottomSheetRef.current?.expand(); setBottomSheetVisible(true) }}
                    >
                        <Icon name="plus" size={28} color="#8688BC" />
                        <Text style={styles.paymentTitltAddText}>Add New Card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paymentDetail}>
                    <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
                        <Text style={styles.paymentDetailTitle}>Order</Text>
                        <Text style={styles.paymentDetailText}>495.000 VNĐ</Text>
                    </View>
                    <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
                        <Text style={styles.paymentDetailTitle}>Order</Text>
                        <Text style={styles.paymentDetailText}>30.000 VNĐ</Text>
                    </View>
                    <View style={{ ...styles.flexRow, justifyContent: "space-between" }}>
                        <Text style={{ ...styles.paymentDetailTitle, fontSize: 16 }}>Summary</Text>
                        <Text style={{ ...styles.paymentDetailText, fontSize: 16 }}>525.000 VNĐ</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.proceedButton}
                    onPress={() => { navigation.navigate("OrderComplete") }}
                >
                    <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>

            </ScrollView >

            {bottomSheetVisible && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={closeBottomSheet}
                />
            )}

            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Initially closed
                snapPoints={snapPoints}
                style={{ zIndex: 999 }}
            >
                <View style={styles.sheetContent}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
                        <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Add New Card</Text>

                    {/* Form Fields */}
                    <Text style={styles.label}>Name on card</Text>
                    <TextInput style={styles.input} placeholder="Nguyen Thuong Huyen" />

                    <Text style={styles.label}>Card number</Text>
                    <TextInput style={styles.input} placeholder="1234 4567 7890 1234" keyboardType="numeric" />

                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Expiry date</Text>
                            <TextInput style={styles.input} placeholder="02/24" keyboardType="numeric" />
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput style={styles.input} placeholder="•••" keyboardType="numeric" secureTextEntry />
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

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
    shippingAddress: {
        width: WIDTH,
        paddingHorizontal: 24,
        paddingVertical: 36,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#F5F5F5",
        opacity: 0.5,
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
    paymentTitle: {
        flexDirection: "row",
        paddingHorizontal: 24,
        marginVertical: 18,
        justifyContent: "space-between"
    },
    paymentTitleText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#424347"
    },
    paymentTitltAddText: {
        fontSize: 13,
        fontWeight: "regular",
        color: "#3E3E3E",
        marginLeft: 8
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
    paymentDetail: {
        marginHorizontal: 28,
        marginVertical: 32,
        gap: 12,
    },
    paymentDetailTitle: {
        fontSize: 13,
        fontWeight: "regular",
        color: "#3E3E3E",
    },
    paymentDetailText: {
        fontSize: 13,
        fontWeight: "regular",
        color: "#3E3E3E",
    },
    // contentContainer
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(114, 114, 114, 0.8)',
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 20
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeText: {
        fontSize: 24,
        color: '#000',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

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
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    }
});