import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk, loginThunk } from "../thunk/userThunk";

const initState = {
  user: {
    _id: "",
    email: "",
    password: "",
    role: "",
    status: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; // Set the user data after fetching
      })
      .addCase(getCurrentUserThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
