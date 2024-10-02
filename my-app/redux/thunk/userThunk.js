import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/auth";
import { getCurrentUser } from "../../api/user";

export const loginThunk = createAsyncThunk(
    "user/login",
    async (data) => {
        try {
            const response = await login(data);
            await AsyncStorage.setItem("accessToken", response?.data?.accessToken);
            return response.data;
        } catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }
);

export const getCurrentUserThunk = createAsyncThunk(
    "user/getCurrentUser",
    async () => {
        try {
            const response = await getCurrentUser();
            return response.data; // Assuming response.data contains the user info
        } catch (error) {
            throw new Error("Failed to getCurrentUser: " + error.message);
        }
    }
);