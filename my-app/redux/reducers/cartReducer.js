import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsThunk } from "../thunk/cartThunk";

const initState = {
    cartList: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        setCartList: (state, action) => {
            state.cartList = action.payload;
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
            })
    },
});
export const { setCartList } = cartSlice.actions;

export default cartSlice.reducer;
