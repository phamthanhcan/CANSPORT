import { STATUS_ORDER } from "../../models/order";
import * as TYPES from "./admin.types";

const initialState = {
  hasError: false,
  isLoading: false,
  data: null,
  error: null,
  totalPages: 1,
};

export const usersData = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_LIST_USER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_LIST_USER_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    case TYPES.DELETE_USER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.DELETE_USER_SUCCESS:
      let temp1 = [...state.data].map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        } else {
          return {
            ...item,
            status: false,
          };
        }
      });
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: temp1,
      };
    case TYPES.DELETE_USER_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };
    case TYPES.EDIT_USER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.EDIT_USER_SUCCESS:
      let temp2 = [...state.data].map((item) => {
        if (item.id !== action.payload.userId) {
          return item;
        } else {
          return {
            ...item,
            ...action.payload.data,
          };
        }
      });
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: temp2,
      };
    case TYPES.EDIT_USER_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };
    case TYPES.ADD_USER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.ADD_USER_SUCCESS:
      let temp3 = [...state.data];
      temp3.push(action.payload.data);
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: temp3,
      };
    case TYPES.ADD_USER_FAIL:
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

export const listOrder = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_LIST_ORDER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
      };
    case TYPES.GET_LIST_ORDER_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    case TYPES.CONFIRM_ORDER:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.CONFIRM_ORDER_SUCCESS:
      const temp = [...state.data].map((order) => {
        if (order.id !== action.payload) {
          return order;
        } else {
          return {
            ...order,
            status: STATUS_ORDER.CONFIRMED,
          };
        }
      });

      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: temp,
      };
    case TYPES.CONFIRM_ORDER_FAIL:
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
