import { createSlice } from "@reduxjs/toolkit";
import { getNotificationThunk } from "../thunk/notificationThunk";

const initState = {
  notificateList: [],
};

const notificateSlice = createSlice({
  name: "notificate",
  initialState: initState,
  reducers: {
    setNotificateList: (state, action) => {
      state.notificateList = action.payload.reverse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notificateList = action.payload?.reverse() || [];
      })
      .addCase(getNotificationThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { setNotificateList } = notificateSlice.actions;

export default notificateSlice.reducer;
