import { postApi } from "../../libs/api";
import * as TYPES from "./types";

export const login = (account) => async (dispatch) => {
  dispatch({
    type: TYPES.LOGIN,
  });

  try {
    const res = await postApi(["auth", "loginAdmin"], account);
    console.log("res", res);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.LOGIN_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const logout = () => {
  return {
    type: TYPES.LOGOUT,
  };
};
