import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemCart, getCartByUser, deleteCart } from "../cart.actions";
import { numberWithCommas } from "../../../shared/helper/data";
import Empty from "../../../shared/components/modules/Empty";
import LoadingPage from "../../../shared/components/modules/LoadingPage";

const Cart = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const cart = useSelector((state) => state.cart.data);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const [totalPrice, setTotalPrice] = useState(0);

  const deleteProductCart = (productCartId, cartId, skuId) => {
    dispatch(deleteItemCart(productCartId, cartId, skuId));
  };

  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart?.products.reduce((sum, item) => {
          if (item.sku) {
            return (
              sum +
              (item.sku.price * item.quantity -
                item.sku.price * item.quantity * (item.sku.discount / 100))
            );
          } else {
            return (
              sum +
              (item.product.maxPrice * item.quantity -
                item.product.maxPrice *
                  item.quantity *
                  (item.product.discount / 100))
            );
          }
        }, 0)
      );
    }
  }, [cart]);

  const isProductHasSku = (product) => {
    return product.sku ? true : false;
  };

  useEffect(() => {
    dispatch(getCartByUser(user.encode._id));
  }, [dispatch]);

  const deleteCartAll = () => {
    dispatch(deleteCart(cart.id, user.encode._id));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="main container">
      <h2 className="admin-title">GIỎ HÀNG</h2>
      {cart && cart?.products?.length === 0 ? (
        <>
          <Empty />
          <div className="f-center-x">
            <Link to="/" className="btn btn-primary">
              QUAY LẠI MUA HÀNG
            </Link>
          </div>
        </>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Tên sản phẩm</th>
                <th>Màu sắc</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Khuyến mãi</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((item) => {
                if (isProductHasSku(item)) {
                  return (
                    <tr key={item.sku.id}>
                      <td>
                        <img src={item.sku.image} alt="" />
                      </td>
                      <td>
                        <p>{item.product.name}</p>
                      </td>
                      <td>
                        <li
                          className="product-view-option"
                          style={{ backgroundColor: item.sku.color }}
                        ></li>
                      </td>
                      <td>
                        <li className="product-view-option">{item.sku.size}</li>
                      </td>
                      <td>
                        <span className="price">
                          {numberWithCommas(item.sku.price)}đ
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          defaultValue={item.quantity}
                          className="form-control input-quantity"
                        />
                      </td>
                      <td>{item.sku.discount}</td>
                      <td>
                        <span className="price">
                          {numberWithCommas(
                            item.quantity * item.sku.price -
                              item.quantity *
                                item.sku.price *
                                (item.sku.discount / 100)
                          )}
                          đ
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            deleteProductCart(
                              item.product.id,
                              cart.id,
                              item.sku.id
                            )
                          }
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={item.product.id}>
                      <td>
                        <img src={item.product.images[0]} alt="" />
                      </td>
                      <td>
                        <p>{item.product.name}</p>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <span className="price">
                          {numberWithCommas(item.product.maxPrice)}đ
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          defaultValue={item.quantity}
                          className="form-control input-quantity"
                        />
                      </td>
                      <td>
                        <span>{item.product.discount}</span>
                      </td>
                      <td>
                        <span className="price">
                          {numberWithCommas(
                            item.quantity * item.product.maxPrice
                          )}
                          đ
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            deleteProductCart(item.product.id, cart.id)
                          }
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div className="cart-actions">
            <Link to="/" className="btn btn-primary">
              Tiếp tục mua hàng
            </Link>
            <div>
              <button className="btn btn-primary mr-3" onClick={deleteCartAll}>
                Xoá giỏ hàng
              </button>
            </div>
          </div>
          <div className="row cart-totals">
            <div className="col-8"></div>
            <div className="col-4">
              <h3 className="cart-totals-title">TỔNG TIỀN</h3>
              <div className="totals">
                <span className="totals-label">Tổng</span>
                <span className="totals-content">
                  {numberWithCommas(totalPrice)}đ
                </span>
              </div>
              <button className="btn btn-primary full-width">Chốt đơn</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
