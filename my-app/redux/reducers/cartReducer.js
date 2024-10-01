import { createSlice } from "@reduxjs/toolkit";

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
});
export const { setCartList } = cartSlice.actions;

export default cartSlice.reducer;
