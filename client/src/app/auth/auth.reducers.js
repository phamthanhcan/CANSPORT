import axios from "axios";
import * as TYPES from "./auth.types";

const initialState = {
  hasError: false,
  isLoading: false,
  data: JSON.parse(localStorage.getItem("user") || "{}") || null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.LOGIN_SUCCESS:
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.LOGIN_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    case TYPES.LOGOUT:
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = "";

      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
