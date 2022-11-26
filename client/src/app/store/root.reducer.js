import { combineReducers } from "redux";

import authReducer from "../auth/auth.reducers";
import { userReducer } from "../pages/account/account.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
