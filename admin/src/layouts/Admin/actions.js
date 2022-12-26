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
        `product?size=5&page=${page}&price=${price}&category=${category}&name=${name}&active=${active}`,
      ]);
      dispatch({
        type: TYPES.GET_PRODUCT_SUCCESS,
        payload: {
          data: res.data.products,
          totalPages: res.data.totalPages,
          totalItems: res.data.totalItems,
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

export const editProduct = (productData, id) => async (dispatch) => {
  dispatch({
    type: TYPES.FETCH_PRODUCT,
  });

  try {
    const res = await putApi(["product", id], productData);
    dispatch({
      type: TYPES.UPDATE_PRODUCT_SUCCESS,
      payload: {
        product: res.data.product,
      },
    });
    toast.success("Cập nhật sản phẩm thành công");
  } catch (err) {
    dispatch({
      type: TYPES.UPDATE_PRODUCT_FAIL,
      payload: err.response?.data?.message,
    });
    toast.error("Cập nhật sản phẩm thất bại");
  }
};

export const getListUser = (page, size, name, active) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_LIST_USER,
  });

  try {
    const res = await getApi([
      `user?page=${page}&size=${size}&name=${name}&active=${active}`,
    ]);
    dispatch({
      type: TYPES.GET_LIST_USER_SUCCESS,
      payload: {
        users: res.data.users,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_LIST_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({
    type: TYPES.DELETE_USER,
  });

  try {
    const res = await deleteApi(["user", userId]);
    if (res.data.success) {
      toast.success("Xoá người dùng thành công");
    }
    dispatch({
      type: TYPES.DELETE_USER_SUCCESS,
      payload: { userId },
    });
  } catch (err) {
    if (!err.response.data.success) {
      toast.error(err.response.data?.message || "Xoá người dùng thất bại");
    }
    dispatch({
      type: TYPES.DELETE_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const addUser = (userData) => async (dispatch) => {
  dispatch({
    type: TYPES.ADD_USER,
  });

  try {
    const res = await postApi(["auth", "signup"], userData);
    if (res.data.success) {
      toast.success("Thêm người dùng thành công");
    }
    dispatch({
      type: TYPES.ADD_USER_SUCCESS,
      payload: { user: res.data.user },
    });
  } catch (err) {
    if (!err.response.data.success) {
      toast.error(err.response.data?.message || "Thêm người dùng thất bại");
    }
    dispatch({
      type: TYPES.ADD_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({
    type: TYPES.UPDATE_USER,
  });
  console.log("update");

  try {
    const res = await putApi(["user", userId], userData);
    console.log(res);
    if (res.data.success) {
      toast.success("Cập nhật người dùng thành công");
    }
    dispatch({
      type: TYPES.UPDATE_USER_SUCCESS,
      payload: { user: res.data.user, userId },
    });
  } catch (err) {
    if (!err.response.data.success) {
      toast.error(err.response.data?.message || "Cập nhật người dùng thất bại");
    }
    dispatch({
      type: TYPES.UPDATE_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const getOrders = (page, size) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_ORDERS,
  });

  try {
    const res = await getApi([`order?page=${page}&size=${size}`]);
    dispatch({
      type: TYPES.GET_ORDERS_SUCCESS,
      payload: {
        orders: res.data.orders,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_LIST_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};
