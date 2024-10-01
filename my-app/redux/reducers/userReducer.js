import { createSlice } from "@reduxjs/toolkit";

const initState = {
    _id: "",
    email: "",
    password: "",
    role: "",
    status: false,
    createdAt: "",
    updatedAt: "",
    __v: 0
};

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        setUserInfo: (state, action) => {
            state.data = action.payload;
        },
    },
});
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
