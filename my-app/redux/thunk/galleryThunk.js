import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGallery } from "../../api/gallery";
import { getCollections } from "../../api/collection";

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

export const getAllPlantsFromGalleryThunk = createAsyncThunk(
  "galleries/getAllPlantsFromGallery",
  async (galleries) => {
    const plantList = [];
    for (const collection of galleries.list_collection_id) {
      const collectionId = collection._id;
      const collectionData = await getCollections(collectionId);
      plantList.push(...collectionData?.data?.list_plant_id);
    }
    return plantList;
  }
);
