import { Category } from "../../models/category";
import { Product, Sku } from "../../models/product";
import { deleteApi, getApi, postApi, putApi } from "../../shared/helper/api";
import * as TYPES from "./home.types";

export const getListProducts =
  (page, price = 0, category = "", name = "") =>
  async (dispatch) => {
    dispatch({
      type: TYPES.GET_LIST_PRODUCT,
    });

    try {
      const res = await getApi([
        `product?size=10&page=${page}&price=${price}&category=${category}&name=${name}`,
      ]);
      const data = res.data.products.map((item) => {
        return new Product(item);
      });
      dispatch({
        type: TYPES.GET_LIST_PRODUCT_SUCCESS,
        payload: {
          data,
          totalPages: res.data.totalPages,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_LIST_PRODUCT_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };

export const getProductDetail = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_PRODUCT_DETAIL,
  });

  try {
    const res = await getApi(["product", id]);
    const data = new Product(res.data.product);
    dispatch({
      type: TYPES.GET_PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_PRODUCT_DETAIL_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const getListCategory = () => async (dispatch) => {
  dispatch({
    type: TYPES.GET_LIST_CATEGORY,
  });

  try {
    const res = await getApi(["categories"]);
    const data = res.data.categories.map((item) => {
      return new Category(item);
    });
    dispatch({
      type: TYPES.GET_LIST_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_LIST_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const editCategory = (id, data) => async (dispatch) => {
  dispatch({
    type: TYPES.EDIT_CATEGORY,
  });

  try {
    const res = await putApi(["categories", id], data);
    dispatch({
      type: TYPES.EDIT_CATEGORY_SUCCESS,
      payload: {
        id,
        data,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const addCategory = (data) => async (dispatch) => {
  dispatch({
    type: TYPES.ADD_CATEGORY,
  });

  try {
    const res = await postApi(["categories"], data);
    dispatch({
      type: TYPES.ADD_CATEGORY_SUCCESS,
      payload: new Category(res.data.category),
    });
  } catch (err) {
    dispatch({
      type: TYPES.ADD_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.DELETE_CATEGORY,
  });

  try {
    const res = await deleteApi(["categories", id]);
    dispatch({
      type: TYPES.DELETE_CATEGORY_SUCCESS,
      payload: {
        id,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.DELETE_PRODUCT,
  });

  try {
    const res = await deleteApi(["products", id]);
    dispatch({
      type: TYPES.DELETE_PRODUCT_SUCCESS,
      payload: {
        id,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_PRODUCT_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const getSkuOfProducts = (productId) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_SKU_OF_FRODUCT,
  });

  try {
    const res = await postApi(["sku"], {
      productId: productId,
    });
    const data = res.data.skus.map((item) => {
      return new Sku(item);
    });
    dispatch({
      type: TYPES.GET_SKU_OF_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_SKU_OF_FRODUCT_FAIL,
      payload: err.response?.data?.message,
    });
  }
};
