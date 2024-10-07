import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsThunk } from "../thunk/cartThunk";

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
      .addCase(getCartItemsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload;
      })
      .addCase(getCartItemsThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { setGalleries } = galleriesSlice.actions;

export default galleriesSlice.reducer;
