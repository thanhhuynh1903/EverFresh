import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCart } from "../../api/cart";

export const getCartItemsThunk = createAsyncThunk(
    "user/login",
    async (data) => {
        try {
            const response = await getCart(data);
            return response.data;
        } catch (error) {
            throw new Error("Failed to getCart: " + error.message);
        }
    }
);