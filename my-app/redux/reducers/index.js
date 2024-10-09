import { combineReducers } from "redux";

import userSlice from "./userReducer";
import cartSlice from "./cartReducer";
import galleriesSlice from "./galleriesReducer";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  gallery: galleriesSlice,
});

export default rootReducer;
