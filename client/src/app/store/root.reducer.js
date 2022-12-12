import { combineReducers } from "redux";

import authReducer from "../auth/auth.reducers";
import { userReducer } from "../pages/account/account.reducers";
import {
  categoryReducer,
  productReducer,
  skuReducer,
  sizeReducer,
} from "../pages/home/home.reducers";
import { cartReducer } from "../pages/cart/cart.reducers";
import { usersData } from "../pages/admin/admin.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  sku: skuReducer,
  cart: cartReducer,
  size: sizeReducer,
  usersData: usersData,
});

export default rootReducer;
