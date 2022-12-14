import { Cart } from "../../models/cart";
import { deleteApi, getApi, postApi } from "../../shared/helper/api";
import * as TYPES from "./cart.types";

export const addProductCart =
  (productId, sizeId = null, quantity, userId, navigate) =>
  async (dispatch) => {
    dispatch({
      type: TYPES.ADD_PRODUCT_CART,
    });

    try {
      const res = await postApi(["cart"], {
        productId: productId,
        sizeId: sizeId,
        quantity: quantity,
        userId: userId,
      });
      if (res.data.success) {
        navigate("/cart");
      }
      const products = res.data.cart.products;
      dispatch({
        type: TYPES.ADD_PRODUCT_CART_SUCCESS,
        payload: products,
      });
    } catch (err) {
      dispatch({
        type: TYPES.ADD_PRODUCT_CART_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };

export const clearCart = () => {
  return {
    type: TYPES.CLEAR_LIST_CART,
  };
};

export const getCartByUser = (userId) => async (dispatch) => {
  dispatch({
    type: TYPES.GET_CART_BY_USER,
  });

  try {
    const res = await getApi([`cart?userId=${userId}`]);
    console.log(userId);
    dispatch({
      type: TYPES.GET_CART_BY_USER_SUCCESS,
      payload: res.data.cart,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_CART_BY_USER_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const deleteItemCart =
  (productCartId, cartId, sizeId = null) =>
  async (dispatch) => {
    dispatch({
      type: TYPES.DELETE_ITEM_CART,
    });

    try {
      const res = await postApi(["cart/product-cart"], {
        productCartId: productCartId,
        cartId: cartId,
        sizeId: sizeId,
      });

      dispatch({
        type: TYPES.DELETE_ITEM_CART_SUCCESS,
        payload: {
          productCartId,
          sizeId,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.DELETE_ITEM_CART_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };

export const deleteCart = (cartId, userId) => async (dispatch) => {
  dispatch({
    type: TYPES.DELETE_CART,
  });
  try {
    const res = await deleteApi(["cart", cartId], { userId });
    dispatch({
      type: TYPES.DELETE_CART_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_CART_FAIL,
      payload: err.message,
    });
  }
};
