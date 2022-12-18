import * as TYPES from "./types";

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  message: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_CATEGORY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TYPES.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        categories: action.payload,
      };
    case TYPES.GET_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case TYPES.DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TYPES.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case TYPES.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case TYPES.ADD_CATEGORY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TYPES.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        categories: [...state.categories, action.payload],
      };

    case TYPES.ADD_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case TYPES.EDIT_CATEGORY:
      return {
        ...state,
        isError: false,
        isLoading: true,
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
        isError: false,
        isLoading: false,
        categories: temp,
      };
    case TYPES.EDIT_CATEGORY_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
