import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPlantsFromGalleryThunk,
  getGaleryThunk,
} from "../thunk/galleryThunk";
import { getCollections } from "../../api/collection";

const initState = {
  galleries: [],
  plantList: [],
  loading: false,
};

const galleriesSlice = createSlice({
  name: "galleries",
  initialState: initState,
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGaleryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGaleryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.galleries = action.payload;
      })
      .addCase(getGaleryThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllPlantsFromGalleryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlantsFromGalleryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plantList = action.payload;
      })
      .addCase(getAllPlantsFromGalleryThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setGalleries } = galleriesSlice.actions;

export default galleriesSlice.reducer;
