import { combineReducers } from "redux";

import authReducer from "../auth/auth.reducers";
import { userReducer } from "../pages/account/account.reducers";
import { categoryReducer, productReducer } from "../pages/home/home.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
