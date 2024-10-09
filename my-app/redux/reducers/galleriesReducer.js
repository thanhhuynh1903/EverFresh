import { createSlice } from "@reduxjs/toolkit";
import { getGaleryThunk } from "../thunk/galleryThunk";

const initState = {
  galleries: [],
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
      });
  },
});
export const { setGalleries } = galleriesSlice.actions;

export default galleriesSlice.reducer;
