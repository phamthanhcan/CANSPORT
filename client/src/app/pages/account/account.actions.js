import { User } from "../../models/user";
import * as TYPES from "../account/account.types";
import { getApi, putApi } from "../../shared/helper/api";

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
