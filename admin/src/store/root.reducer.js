import { combineReducers } from "redux";
import authReducer from "../layouts/Auth/reducer";
import adminReducer from "../layouts/Admin/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

export default rootReducer;
