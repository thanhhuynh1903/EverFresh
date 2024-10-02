import { combineReducers } from "redux";

import userSlice from "./userReducer";
import cartSlice from "./cartReducer";

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
});

export default rootReducer;
