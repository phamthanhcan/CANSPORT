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
      let isHave = false;

      const data = { ...state.data }.products.map((item) => {
        if (
          item.product?.id === action.payload.productId && item.sku
            ? item.sku.id
            : null === action.payload.skuId
        ) {
          isHave = true;
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
          };
        } else {
          return item;
        }
      });
      if (!isHave) {
        data.push(new ProductCart({ quantity: action.payload.quantity }));
      }
      return {
        ...state,
        hasError: false,
        data: {
          ...state.data,
          products: data,
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
          products: cartTemp.products.filter(
            (item) => item.id !== action.payload
          ),
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

    default:
      return state;
  }
};
