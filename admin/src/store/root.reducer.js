import { combineReducers } from "redux";
import authReducer from "../layouts/Auth/reducer";
import {
  categoryReducer,
  productReducer,
  userReducer,
} from "../layouts/Admin/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  user: userReducer,
});

export default rootReducer;
