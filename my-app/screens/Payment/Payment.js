import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from '@gorhom/bottom-sheet';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const data = [
    {
        id: '1',
        title: 'Item 1',
        imageUrl: require("../../assets/utilsImage/card-1.png"),
    },
    {
        id: '2',
        title: 'Item 2',
        imageUrl: require("../../assets/visaCard.png"),
    },
    {
        id: '3',
        title: 'Item 3',
        imageUrl: require("../../assets/utilsImage/card-1.png"),
    },
];

export default function Payment({ route }) {
    const navigation = useNavigation();
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setBottomSheetVisible(false);
    };

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image
                source={item.imageUrl}
                style={styles.carouselImage}
                resizeMode="stretch"
            />
        </View>
    );

    // Render dots for the carousel
    const renderDots = () => (
        <View style={styles.dotContainer}>
            {data.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        { backgroundColor: currentIndex === index ? '#0D986A' : '#ccc' }
                    ]}
                />
            ))}
        </View>
    );

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

                {/* Carousel */}
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderCarouselItem}
                    horizontal
                    pagingEnabled={false} // Disable default paging since we are customizing it
                    snapToInterval={WIDTH * 0.8} // Width of card + margins
                    decelerationRate="fast" // Fast snapping behavior
                    snapToAlignment="center" // Snap the card to the center
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.floor(event.nativeEvent.contentOffset.x / (WIDTH * 0.8));
                        setCurrentIndex(newIndex);
                    }}
                />

                {/* Dots */}
                {renderDots()}

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

                {/* Payment Summary */}
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

            {/* Bottom sheet */}
            {bottomSheetVisible && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={closeBottomSheet}
                />
            )}

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                style={{ zIndex: 999 }}
            >
                <View style={styles.sheetContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
                        <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add New Card</Text>
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
        backgroundColor: "#FFFFFF",
    },
    contentContainer: {
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
        zIndex: 10,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",

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
        bottom: 5,
        fontSize: 17,
        color: "#0D986A",
        fontWeight: "regular"
    },
    backButton: {
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
        fontWeight: "bold"
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
    shippingAddressChange: {
        marginTop: 12,
    },
    shippingAddressChangetText: {
        fontSize: 14,
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
        color: "#3E3E3E",
        marginLeft: 8
    },
    proceedButton: {
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
        marginVertical: 10
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    paymentDetailTitle: {
        fontSize: 14,
        color: "#8688BC"
    },
    paymentDetailText: {
        fontSize: 14,
        color: "#000000"
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: 998
    },
    sheetContent: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeText: {
        fontSize: 30,
        color: '#000',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000",
        textAlign: "center",
        marginVertical: 10
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginVertical: 8,
    },
    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 16
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    col: {
        width: "48%"
    },
    addButton: {
        paddingVertical: 14,
        backgroundColor: "#0D986A",
        borderRadius: 4
    },
    addButtonText: {
        textAlign: "center",
        color: "white"
    },
    carouselItem: {
        width: WIDTH * 0.6, // Set width to 60% of the screen width
        // marginHorizontal: WIDTH * 0.1, // Set margin to 10% of the screen width on both sides
        height: 200,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

