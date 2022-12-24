import * as TYPES from "./home.types";

const initialState = {
  hasError: false,
  isLoading: false,
  data: null,
  error: null,
  totalPages: 0,
  totalItems: 0,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_LIST_PRODUCT:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };
    case TYPES.GET_LIST_PRODUCT_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    case TYPES.DELETE_PRODUCT:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.DELETE_PRODUCT_SUCCESS:
      // let temp1 = [...state.data].map((item) => {
      //   if (item.id !== action.payload.id) {
      //     return item;
      //   } else {
      //     return {
      //       ...item,
      //       status: false,
      //     };
      //   }
      // });

      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: [...state.data].filter((item) => item.id !== action.payload.id),
      };
    case TYPES.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.GET_PRODUCT_DETAIL:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
      };
    case TYPES.GET_PRODUCT_DETAIL_FAIL:
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

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_LIST_CATEGORY:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_LIST_CATEGORY_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    case TYPES.EDIT_CATEGORY:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.EDIT_CATEGORY_SUCCESS:
      const temp = [...state.data].map((item) => {
        if (item.id === action.payload.id) {
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
        error: null,
        data: temp,
      };
    case TYPES.EDIT_CATEGORY_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.DELETE_CATEGORY:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.DELETE_CATEGORY_SUCCESS:
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
    case TYPES.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.ADD_CATEGORY:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        error: null,
      };
    case TYPES.ADD_CATEGORY_SUCCESS:
      let temp2 = [...state.data];
      temp2.push(action.payload);
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: temp2,
      };
    case TYPES.ADD_CATEGORY_FAIL:
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

export const skuReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_SKU_OF_FRODUCT:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_SKU_OF_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_SKU_OF_FRODUCT_FAIL:
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

export const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_SIZE_OF_PRODUCT:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        data: null,
        error: null,
      };
    case TYPES.GET_SIZE_OF_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case TYPES.GET_SIZE_OF_PRODUCT_FAIL:
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
