import { combineReducers } from "redux";

import userSlice from "./userReducer";

const rootReducer = combineReducers({
    user: userSlice,
});

export default rootReducer;
