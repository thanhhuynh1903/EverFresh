import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGallery } from "../../api/gallery";

export const getGaleryThunk = createAsyncThunk(
  "galery/getGalery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGallery();
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return the error payload
      return rejectWithValue("Failed to getGalery: " + error.message);
    }
  }
);
