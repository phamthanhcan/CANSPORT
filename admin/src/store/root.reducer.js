import { combineReducers } from "redux";
import authReducer from "../layouts/Auth/reducer";
import {
  categoryReducer,
  orderReducer,
  productReducer,
  userReducer,
} from "../layouts/Admin/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

export default rootReducer;
