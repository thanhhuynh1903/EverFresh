import { combineReducers } from "redux";

import userSlice from "./userReducer";
import cartSlice from "./cartReducer";
import galleriesSlice from "./galleriesReducer";
import notificateSlice from "./notificationReducer";
import saveAreaSlice from "./saveAreaReducer";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  gallery: galleriesSlice,
  notificate: notificateSlice,
  // saveArea: saveAreaSlice,
});

export default rootReducer;
