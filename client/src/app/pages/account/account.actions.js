import { User } from "../../models/user";
import * as TYPES from "../account/account.types";
import { getApi, putApi } from "../../shared/helper/api";
import { Order } from "../../models/order";
import { toast } from "react-toastify";

export const getUserInfor = (userId) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_USER_INFOR,
  });

  try {
    const res = await getApi([`user/${userId}`]);
    const data = new User(res.data.user);
    dispatch({
      type: TYPES.GET_USER_INFOR_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_USER_INFOR_ERROR,
      payload: err.response?.data?.message,
    });
  }
};

export const getOrderByUser = (userId) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_ORDERS,
  });

  try {
    const res = await getApi([`order/user/${userId}`]);
    dispatch({
      type: TYPES.GET_ORDERS_SUCCESS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ORDERS_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const editUserInfor = (userId, data) => async (dispatch) => {
  dispatch({
    type: TYPES.EDIT_USER_INFORMATION,
  });

  try {
    const res = await putApi([`user/${userId}`], data);
    if (res.data.success) {
      dispatch(getUserInfor(userId));
      toast.success("Cập nhật người dùng thành công");
    }
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_USER_INFORMATION_ERROR,
      payload: err.response?.data?.message,
    });

    toast.error(
      err.response?.data?.message || "Đã xảy ra lỗi khi cập nhật người dùng"
    );
  }
};
