import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatPrice } from '../../utils/utils';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PlantBookingCard(plant) {
    const [item, setItem] = useState(plant?.item)

    useEffect(() => {
        setItem(plant?.item)
    }, [plant?.item])

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={item?.onPress && item?.onPress}>
            <Image
                source={item?.image}
                resizeMode="stretch"
                style={styles.image}
            />
            <View style={styles.center}>
                <View style={styles.centerFuncional}>
                    <Text style={styles.centerTitle}>{item?.name}</Text>
                    <TouchableOpacity style={styles.flexRow}>
                        {!item?.bookmark && <Text style={styles.centerStock}>In stock</Text>}

                        <Image
                            source={item?.bookmark ?
                                require('../../assets/cart/bookMarkIconChecked.png')
                                :
                                require('../../assets/cart/bookMarkIcon.png')
                            }
                            resizeMode="stretch"
                            style={styles.bookMarkIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.centerFuncional}>
                    <TouchableOpacity style={styles.funcionalButton}>
                        <Icon name="plus" size={24} color="#002140" />
                    </TouchableOpacity>
                    <Text style={styles.amount}>{item?.amount || 1}</Text>
                    <TouchableOpacity style={styles.funcionalButton}>
                        <Icon name="minus" size={24} color="#002140" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/cart/bin.png')}
                            resizeMode="stretch"
                            style={styles.bookMarkIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.centerPrice}>{formatPrice(item?.price || 0)} VNĐ</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT * 0.10,
        width: "100%",
        overflow: "visible",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        // justifyContent: "space-between"
    },
    image: {
        width: "20%",
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
        width: "100%",
        flexDirection: "row",
        // flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between"
    },
    funcionalButton: {
        borderWidth: 2,
        borderRadius: 8
    },
    centerTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#002140"
    },
    centerStock: {
        fontSize: 14,
        fontWeight: "regular",
        color: "#DB8B00"
    },
    amount: {
        fontSize: 14,
        fontWeight: "semibold",
        color: "#0D986A"
    },
    centerPrice: {
        fontSize: 14,
        fontWeight: "medium",
        color: "#002140"
    },

    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
});