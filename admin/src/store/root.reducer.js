import { combineReducers } from "redux";
import authReducer from "../layouts/Auth/reducer";
import { categoryReducer, productReducer } from "../layouts/Admin/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
