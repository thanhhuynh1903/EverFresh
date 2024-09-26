import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, TextInput } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const plantInfo = [
    {
        title: "Plant Height",
        info: "1 to 3 feet",
    },
    {
        title: "Plant Width",
        info: "1 to 3 feet",
    },
    {
        title: "Zones",
        info: "10, 3, 4, 5, 6, 7, 8, 9",
    },
    {
        title: "Uses",
        info: "Containers, Ground Covers",
    },
    {
        title: "Tolerance",
        info: "Drought Tolerant",
    },
    {
        title: "Bloom Time",
        info: "Early Summer, Summer",
    },
    {
        title: "Light",
        info: "Full Sun",
    },
    {
        title: "Moisture",
        info: "Medium Moisture",
    },
    {
        title: "Maintenance",
        info: "Moderate",
    },
    {
        title: "Growth Rate",
        info: "Moderate",
    },
    {
        title: "Plant Type",
        info: "Perennials",
    },
    {
        title: "Plant Seasonal Interest",
        info: "Summer Interest",
    },
    {
        title: "Flower Color",
        info: "Yellow",
    }
];


export default function PlantGuide({ route }) {
    const [plant, setPlant] = useState(route.params.plant)

    const navigation = useNavigation();

    const renderInfoCard = (item, key) => {
        return (
            <View style={styles.plantInforCard} key={key}>
                <Text style={styles.plantInforCardTitle}>{item.title}:</Text>
                <Text style={styles.plantInforCardInfo}>{item.info}</Text>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ ...styles.header, backgroundColor: "white" }}>
                <TouchableOpacity style={styles.iconstyle} onPress={navigation.goBack}>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <View style={styles.fetureList}>
                    <Text style={styles.title}>Plant Guide</Text>
                </View>
            </View>
            <View style={styles.plantDetail}>
                <Text style={styles.plantDetailTitle}>‘Banana Boat’ daylily</Text>
                <Text style={styles.plantDetailName}>Hemerocallis ‘Banana Boat’</Text>
                <Text style={styles.plantDetailClass}>hem-er-oh-KAL-iss</Text>
                <Image
                    source={require("../../assets/utilsImage/plantGuideImage.png")}
                    resizeMode="contain"
                    style={styles.plantDetailImage}
                />
            </View>
            <View style={styles.plantInforList}>
                <View style={styles.plantInforCard}>
                    <Text style={styles.plantInforCardTitle}>Genus:</Text>
                    <Text style={{ ...styles.plantInforCardInfo, color: "#0C9553", textDecorationLine: "underline" }}>Hemerocallis</Text>
                </View>
                {plantInfo.map((item, key) => renderInfoCard(item, key))}
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        overflow: "visible",
        marginBottom: 80,
        backgroundColor: "#FFFFFF",
        zIndex: 11
    },
    plantDetail: {
        justifyContent: "center",
        gap: 12,
    },
    plantDetailTitle: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "regular"
    },
    plantDetailName: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "regular"
    },
    plantDetailClass: {
        textAlign: "center",
        fontSize: 11,
        fontWeight: "regular",
        color: "#0C9553"
    },
    plantDetailImage: {
        width: WIDTH * 0.7,
        marginHorizontal: WIDTH * 0.15
    },

    plantInforList: {
        paddingHorizontal: 18,
        marginVertical: 24
    },
    plantInforCard: {
        padding: 12,
        backgroundColor: "#f5f5f5",
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    plantInforCardTitle: {
        fontWeight: "bold"
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

    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    }
});