import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SafeAreaWrapper from '../../components/SafeAreaWrapper'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function LoginPage() {

    const navigation = useNavigation();

    const login = async () => {
        [

        ]
    }

    return (
        <SafeAreaWrapper >
            <Text>user name</Text>
            <TextInput
                placeholder='Enter your email'
                placeholderTextColor={"#FFFFFF"}
            />
            <Text>password</Text>
            <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"#FFFFFF"}
            />
            <Button
                onPress={login}
                title="Login"
                color="#841584"
                accessibilityLabel="Login"
            />
        </SafeAreaWrapper>
    )
}
