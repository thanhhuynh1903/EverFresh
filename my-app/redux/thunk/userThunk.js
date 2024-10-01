import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    "user/login",
    async (data) => {
        try {
            const response = await login(data);
            await AsyncStorage.setItem("accessToken", response?.data);
            return response;
        } catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }
);