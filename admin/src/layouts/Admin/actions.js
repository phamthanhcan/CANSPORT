import { toast } from "react-toastify";
import { deleteApi, getApi, postApi, putApi } from "../../libs/api";
import * as TYPES from "./types";

export const getCategory = () => async (dispatch) => {
  dispatch({
    type: TYPES.GET_CATEGORY,
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
    type: TYPES.DELETE_CATEGORY,
  });

  try {
    const res = await deleteApi(["categories", id]);
    toast.success("Xóa danh mục thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    dispatch({
      type: TYPES.DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TYPES.DELETE_CATEGORY_FAIL,
      payload: error.response?.data?.message,
    });
    toast.error("Xóa danh mục thất bại!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
      payload: res.data.category,
    });
    toast.success("Xóa danh mục thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (err) {
    dispatch({
      type: TYPES.ADD_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });
    toast.error("Xóa danh mục thất bại!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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

    toast.success("Cập nhật danh mục thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_CATEGORY_FAIL,
      payload: err.response?.data?.message,
    });

    toast.error("Cập nhật danh mục thất bại!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};