import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificate } from "../../api/notifications";

export const getNotificationThunk = createAsyncThunk(
  "notificate/getNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotificate();
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return the error payload
      return rejectWithValue(
        "Failed to getNotificationThunk: " + error.message
      );
    }
  }
);
