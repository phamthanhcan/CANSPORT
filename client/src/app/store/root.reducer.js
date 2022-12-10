import { combineReducers } from "redux";

import authReducer from "../auth/auth.reducers";
import { userReducer } from "../pages/account/account.reducers";
import {
  categoryReducer,
  productReducer,
  skuReducer,
} from "../pages/home/home.reducers";
import { cartReducer } from "../pages/cart/cart.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  sku: skuReducer,
  cart: cartReducer,
});

export default rootReducer;
