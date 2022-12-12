import { Order } from "../../models/order";
import { User } from "../../models/user";
import { deleteApi, getApi, postApi, putApi } from "../../shared/helper/api";
import * as TYPES from "./admin.types";

export const getListUser = () => async (dispatch) => {
  dispatch({
    type: TYPES.GET_LIST_USER,
  });

  try {
    const res = await getApi(["user/all"]);
    const data = res.data.users.map((item) => {
      return new User(item);
    });
    dispatch({
      type: TYPES.GET_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_LIST_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const getListOrder =
  (page = 0, id = "") =>
  async (dispatch) => {
    dispatch({
      type: TYPES.GET_LIST_ORDER,
    });

    try {
      const res = await getApi([`order/all?page=${page}&size=5&id=${id}`]);
      const data = res.data.orders.map((item) => {
        return new Order(item);
      });
      dispatch({
        type: TYPES.GET_LIST_ORDER_SUCCESS,
        payload: {
          data,
          totalPages: res.data.totalPages,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_LIST_ORDER_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };

export const confirmtOrder = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.CONFIRM_ORDER,
  });

  try {
    const res = await postApi(["order/confirm"], { id });
    dispatch({
      type: TYPES.CONFIRM_ORDER_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TYPES.CONFIRM_ORDER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: TYPES.DELETE_USER,
  });

  try {
    const res = await deleteApi(["user", id]);
    dispatch({
      type: TYPES.DELETE_USER_SUCCESS,
      payload: {
        id,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const editUser = (userId, data) => async (dispatch) => {
  dispatch({
    type: TYPES.EDIT_USER,
  });

  try {
    await putApi([`user/${userId}`], data);
    dispatch({
      type: TYPES.EDIT_USER_SUCCESS,
      payload: {
        data,
        userId,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const addUser = (data) => async (dispatch) => {
  dispatch({
    type: TYPES.ADD_USER,
  });

  try {
    const res = await postApi([`auth`, `signup`], data);
    dispatch({
      type: TYPES.ADD_USER_SUCCESS,
      payload: {
        data: new User(res?.data.user),
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.ADD_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};
