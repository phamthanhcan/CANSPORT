import { toast } from "react-toastify";
import { deleteApi, getApi, postApi, putApi } from "../../libs/api";
import * as TYPES from "./types";

export const getCategory = () => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_CATEGORY,
  });

  try {
    const res = await getApi(["categories?active=true"]);
    const data = res.data.categories;
    dispatch({
      type: TYPES.GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPES.GET_CATEGORY_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_CATEGORY,
  });

  try {
    const res = await deleteApi(["categories", id]);
    toast.success("Xóa danh mục thành công!");

    dispatch({
      type: TYPES.DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TYPES.DELETE_CATEGORY_FAIL,
      payload: error.response?.data?.message,
    });
    toast.error("Xóa danh mục thất bại!");
  }
};

export const addCategory = (data) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_CATEGORY,
  });

  try {
    const res = await postApi(["categories"], data);
    dispatch({
      type: TYPES.ADD_CATEGORY_SUCCESS,
      payload: res.data.category,
    });
    toast.success("Xóa danh mục thành công!");
  } catch (err) {
    dispatch({
      type: TYPES.ADD_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
    toast.error("Xóa danh mục thất bại!");
  }
};

export const editCategory = (id, data) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_CATEGORY,
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

    toast.success("Cập nhật danh mục thành công!");
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });

    toast.error("Cập nhật danh mục thất bại!");
  }
};

export const getListProducts =
  (page, price = 0, category = "", name = "", active = false) =>
  async (dispatch) => {
    dispatch({
      type: TYPES.FETCH_PRODUCT,
    });

    try {
      const res = await getApi([
        `product?size=10&page=${page}&price=${price}&category=${category}&name=${name}&active=${active}`,
      ]);
      const data = res.data.products;
      dispatch({
        type: TYPES.GET_PRODUCT_SUCCESS,
        payload: {
          data,
          totalPages: res.data.totalPages,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_PRODUCT_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_PRODUCT,
  });

  try {
    const res = await deleteApi(["product", id]);
    dispatch({
      type: TYPES.DELETE_PRODUCT_SUCCESS,
      payload: {
        id,
      },
    });

    toast.success("Xóa sản phẩm thành công!");
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_PRODUCT_FAIL,
      payload: err.response?.data?.message,
    });
    toast.error("Xóa sản phẩm thất bại!");
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_PRODUCT,
  });

  try {
    const res = await postApi(["product"], productData);
    console.log(res.data);
    dispatch({
      type: TYPES.ADD_PRODUCT_SUCCESS,
      payload: {
        product: res.data.product,
      },
    });
    toast.success("Thêm sản phẩm thành công");
  } catch (err) {
    dispatch({
      type: TYPES.ADD_PRODUCT_FAIL,
      payload: err.response?.data?.message,
    });
    toast.error("Thêm sản phẩm thất bại");
  }
};
