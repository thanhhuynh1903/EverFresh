import { View, Text, TextInput, Button, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk, loginThunk } from '../../redux/thunk/userThunk';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import { getCartItemsThunk } from '../../redux/thunk/cartThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function LoginPage() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            handleCheckToken()
        }, [])
    );

    handleCheckToken = async () => {
        setLoading(true)
        const userResponse = await dispatch(getCurrentUserThunk());
        if (userResponse.meta.requestStatus === 'fulfilled') {
            const response = await dispatch(getCartItemsThunk());
            navigation.navigate("homepage");
        }
        setLoading(false)
    }

    const handleLogin = async () => {
        const response = await dispatch(loginThunk({ email, password }));
        if (response.meta.requestStatus === 'fulfilled') { // If login successful
            const userResponse = await dispatch(getCurrentUserThunk());
            if (userResponse.meta.requestStatus === 'fulfilled') {
                const response = await dispatch(getCartItemsThunk());
                navigation.navigate("homepage"); // Redirect to homepage
            } else {
                console.log('Failed to fetch user data');
            }
        } else {
            console.log('Login failed: ', response.payload); // Handle error
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
                <Text>Username</Text>
                <TextInput
                    placeholder='Enter your email'
                    placeholderTextColor={"#FFFFFF"}
                    style={{ width: "90%", padding: 6, borderWidth: 1 }}
                    onChangeText={setEmail}
                    value={email}
                />
                <Text>Password</Text>
                <TextInput
                    placeholder='Enter your password'
                    placeholderTextColor={"#FFFFFF"}
                    style={{ width: "90%", padding: 6, borderWidth: 1 }}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <Button
                    onPress={handleLogin}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Login"
                />
            </View>
            {loading && <SpinnerLoading />}
        </SafeAreaWrapper>
    );
}
