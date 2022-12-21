import * as TYPES from "./types";

const initialStateCategory = {
  isLoading: false,
  hasError: false,
  categories: [],
  message: "",
};

export const categoryReducer = (state = initialStateCategory, action) => {
  switch (action.type) {
    case TYPES.FETCH_CATEGORY:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case TYPES.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        categories: action.payload,
      };
    case TYPES.GET_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        message: action.payload,
      };
    case TYPES.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case TYPES.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        message: action.payload,
      };
    case TYPES.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        categories: [...state.categories, action.payload],
      };

    case TYPES.ADD_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        message: action.payload,
      };
    case TYPES.EDIT_CATEGORY_SUCCESS:
      const temp = [...state.categories].map((item) => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        hasError: false,
        isLoading: false,
        categories: temp,
      };
    case TYPES.EDIT_CATEGORY_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

const initialStateProduct = {
  isLoading: false,
  hasError: false,
  message: "",
  products: [],
  totalPages: 0,
};

export const productReducer = (state = initialStateProduct, action) => {
  switch (action.type) {
    case TYPES.FETCH_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };

    case TYPES.GET_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        hasError: false,
        products: action.payload.data,
        totalPages: action.payload.totalPages,
      };
    case TYPES.GET_PRODUCT_FAIL:
      return {
        isLoading: false,
        hasError: true,
        message: action.payload,
      };

    case TYPES.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: [...state.data].filter((item) => item._id !== action.payload.id),
      };
    case TYPES.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        products: [action.payload.product, ...state.products],
      };
    case TYPES.ADD_PRODUCT_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
