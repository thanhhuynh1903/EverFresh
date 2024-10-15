import { createSlice } from "@reduxjs/toolkit";

const initState = {
  color: "white",
};

const saveAreaSlice = createSlice({
  name: "saveArea",
  initialState: initState,
  reducers: {
    setSaveAreaColor: (state, action) => {
      state.color = action.payload;
    },
  },
});
export const { setSaveAreaColor } = saveAreaSlice.actions;

export default saveAreaSlice.reducer;
