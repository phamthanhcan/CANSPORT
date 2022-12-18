import * as TYPES from "./account.types";

const initialState = {
  hasError: false,
  isLoading: false,
  data: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_USER_INFOR:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_USER_INFOR_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_USER_INFOR_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ORDERS:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_ORDERS_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_ORDERS_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
