import { createSlice } from "@reduxjs/toolkit";

const initState = {
    notificateList: [],
};

const notificateSlice = createSlice({
    name: "notificate",
    initialState: initState,
    reducers: {
        setNotificateList: (state, action) => {
            state.notificateList = action.payload;
        },
    },
});
export const { setNotificateList } = notificateSlice.actions;

export default notificateSlice.reducer;
