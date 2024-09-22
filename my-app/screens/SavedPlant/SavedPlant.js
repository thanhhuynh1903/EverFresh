import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaWrapper from '../../components/SafeAreaWrapper'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const savedPlantTypes = [
    "Indoor", "Pet friendly", "Papaveraceae"
]

const savedPlantNeeded = [
    {
        name: "Height",
        value: "Small",
        icon: require("../../assets/savedPlant/Ruler.png"),
        backgroundColor: "#EEF7E8",
        color: "#4B8364",
    },
    {
        name: "Water",
        value: "333ml",
        icon: require("../../assets/savedPlant/Vector.png"),
        backgroundColor: "#E6EAFA",
        color: "#7C95E4",
    },
    {
        name: "Light",
        value: "Normal",
        icon: require("../../assets/savedPlant/Sun.png"),
        backgroundColor: "#FCF1E3",
        color: "#E6B44C",
    },
    {
        name: "Humidity",
        value: "56%",
        icon: require("../../assets/savedPlant/Temprature.png"),
        backgroundColor: "#F8E8F8",
        color: "#C390E6",
    },
]

const savedPlantCardDemo = [
    {
        img: require("../../assets/homeImg/plantImage1.png")
    },
    {
        img: require("../../assets/homeImg/plantImage2.png"),
    },
    {
        img: require("../../assets/homeImg/plantImage3.png"),
    },
]

export default function SavedPlant({ route }) {
    const navigation = useNavigation();
    const [savedPlant, setSavedPlant] = useState(route.params.savedPlant)
    const [descriptionReadmore, setDescriptionReadmore] = useState(false)

    const renderPlantType = (item, key) => {
        return (
            // <View style={styles.plantTypeCard} >
            <Text style={styles.plantTypeName} key={key}>{item}</Text>
            // </View>
        )
    }

    const renderSavedPlantCard = (item, key) => {
        return (
            <TouchableOpacity
                style={styles.savedPlantCard}
                key={key}
                onPress={() => navigation.navigate("savedplant", { savedPlant: item })}
            >
                <Image
                    source={item.img}
                    style={styles.savedPlantCardImage}
                />
            </TouchableOpacity>
        )
    }

    const renderPlantNeeded = (item, key) => {
        return (
            <View style={{ ...styles.plantNeedCard, paddingLeft: key % 2 === 0 ? 0 : "15%" }} key={key}>
                <View style={{ ...styles.plantNeedLeft, backgroundColor: item.backgroundColor }}>
                    <Image
                        source={item?.icon}
                        style={styles.plantNeedImage}
                    />
                </View>
                <View style={styles.plantNeedRight}>
                    <Text style={{ ...styles.plantNeedName, color: item.color }}>{item.name}</Text>
                    <Text style={styles.plantNeedValue}>{item.value}</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require('../../assets/savedPlant/savedBackground.png')} // Change this to your image path
                style={styles.savedPlantHeader}
                resizeMode="cover"
            >
                <View style={styles.savedPlantHeaderTop}>
                    <TouchableOpacity
                        style={styles.savedPlantHeaderBack}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.savedPlantHeaderTittle}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.savedPlantHeaderTittle}>Saved plant</Text>
                </View>
                <View style={styles.savedPlantHeaderBottom}>
                    <Image
                        source={savedPlant?.img}
                        style={styles.savedPlantHeaderImage}
                    />
                </View>
            </ImageBackground >
            <View style={styles.plantTitle}>
                <Text style={styles.plantTitleName}>Ginkgo</Text>
                <Text style={styles.plantTitleFullName}>Ginkgo biloba</Text>
            </View>
            <View style={styles.plantType}>
                {savedPlantTypes.map((item, key) => renderPlantType(item, item + key))}
            </View>
            <View style={styles.savedPlantbody}>
                <View style={styles.savedPlantDescription}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionCre}>From Wikipedia, the free encyclopedia</Text>
                    <Text style={styles.descriptionDetail} numberOfLines={descriptionReadmore ? 0 : 5}>
                        Ginkgo biloba first appeared over 290 million years ago, and fossils very similar to the living species, back to the Middle Jurassic epoch approximately 170 million years ago. The tree was cultivated early in human history and remains commonly planted, and is widely regarded as a living fossil....
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={styles.descriptionReadmore}
                            onPress={() => setDescriptionReadmore(!descriptionReadmore)}
                        >
                            {!descriptionReadmore ? "Read more" : "Hidden"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.savedPlantNeeded}>
                    {savedPlantNeeded.map((item, key) => renderPlantNeeded(item, key))}
                </View>
                <Text style={styles.savedPlantImage}>Pictures of Ginkgo</Text>
                <View style={styles.savedPlandContainer}>
                    {savedPlantCardDemo.map((item, key) => renderSavedPlantCard(item, key))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        overflow: "visible",
        // marginBottom: 100,
        backgroundColor: "#FFFFFF"
    },
    savedPlantHeader: {
        paddingVertical: 20,
    },
    savedPlantHeaderTop: {
        width: WIDTH,
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#666666"
    },
    savedPlantHeaderBack: {
        position: "absolute",
        left: 20,
        paddingVertical: 10,
    },
    savedPlantHeaderTittle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 10
    },
    savedPlantHeaderBottom: {
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingBottom: 30
    },
    savedPlantHeaderImage: {
        width: WIDTH * 0.5,
        height: WIDTH * 0.5,
        resizeMode: "contain",
        borderWidth: 2,
        borderColor: "#FFF",
        borderRadius: 8,

        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },  // X: 0, Y: 4
        shadowOpacity: 0.25,
        shadowRadius: 50,
        elevation: 8,
    },
    // title
    plantTitle: {
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    plantTitleName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    plantTitleFullName: {
        fontSize: 16,
        fontWeight: "medium",
        color: "#0D986A"
    },
    // plantType
    plantType: {
        width: WIDTH,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    plantTypeName: {
        color: "#696969",
        fontWeight: "medium",
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        margin: 8,
        backgroundColor: "#F0F3F6",
    },
    // savedPlantbody
    savedPlantbody: {
        paddingHorizontal: 18,
    },
    savedPlantDescription: {
        gap: 8,
        marginBottom: 16
    },
    descriptionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333333"
    },
    descriptionCre: {
        fontSize: 16,
        fontWeight: "medium",
        color: "#8C8C8C"
    },
    descriptionDetail: {
        fontSize: 16,
        fontWeight: "regular",
        color: "#515151"
    },
    descriptionReadmore: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#333333",
        transform: [{ translateY: -6 }],
        textAlign: "right"
    },
    // savedPlantNeeded
    savedPlantNeeded: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    plantNeedCard: {
        width: "50%",
        flexDirection: "row",
        marginBottom: 12,
    },
    plantNeedLeft: {
        width: 58,
        height: 58,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    },
    plantNeedRight: {
        paddingLeft: 12
    },
    plantNeedName: {
        fontSize: 14,
        fontWeight: "bold"
    },
    plantNeedValue: {
        fontSize: 18,
        fontWeight: "medium"
    },
    savedPlantImage: {
        fontSize: 20,
        fontWeight: "medium",
        textAlign: "center",
        marginBottom: 12
    },
    // savedPland
    savedPlandContainer: {
        width: "100%",
        marginBottom: 28,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    savedPlantCard: {
        width: WIDTH * 0.26,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 12,
        elevation: 8,
    },
    savedPlantCardImage: {
        width: "100%",
        height: WIDTH * 0.26,
        resizeMode: "contain",
    },
});