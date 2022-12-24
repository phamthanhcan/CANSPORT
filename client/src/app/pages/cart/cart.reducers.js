import { ProductCart } from "../../models/cart";
import * as TYPES from "./cart.types";

const initialState = {
  hasError: false,
  isLoading: false,
  data: null,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CLEAR_LIST_CART:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        data: null,
        error: null,
      };
    case TYPES.ADD_PRODUCT_CART:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.ADD_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        hasError: false,
        data: {
          ...state.data,
          products: action.payload,
        },
        isLoading: false,
        error: null,
      };
    case TYPES.ADD_PRODUCT_CART_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.GET_CART_BY_USER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_CART_BY_USER_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_CART_BY_USER_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    case TYPES.DELETE_ITEM_CART:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.DELETE_ITEM_CART_SUCCESS:
      const cartTemp = { ...state.data };
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          products: cartTemp.products.filter((item) => {
            if (action.payload.sizeId === null) {
              return item.product?._id !== action.payload.productCartId;
            } else {
              return item.size?._id !== action.payload.sizeId;
            }
          }),
        },
      };
    case TYPES.DELETE_ITEM_CART_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    case TYPES.DELETE_CART:
      return {
        ...state,
        hasError: false,
        isLoading: true,
      };
    case TYPES.DELETE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: null,
      };
    case TYPES.DELETE_CART_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
