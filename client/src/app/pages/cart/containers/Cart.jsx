import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartByUser, deleteCart } from "../cart.actions";
import { numberWithCommas } from "../../../shared/helper/data";
import Empty from "../../../shared/components/modules/Empty";
import LoadingPage from "../../../shared/components/modules/LoadingPage";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const cart = useSelector((state) => state.cart.data);
  const isLoadingProduct = useSelector((state) => state.product.isLoading);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart?.products.reduce((sum, item) => {
          return (
            sum +
            (item.product.price * item.quantity -
              item.product.price *
                item.quantity *
                (item.product.discount / 100))
          );
        }, 0)
      );
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getCartByUser(user.encode._id));
  }, [dispatch]);

  const deleteCartAll = () => {
    dispatch(deleteCart(cart.id, user.encode._id));
  };

  if (isLoading || isLoadingProduct) {
    return <LoadingPage />;
  }

  return (
    <main className="main container">
      <h2 className="section-title">GIỎ HÀNG</h2>
      {cart === null || cart?.products?.length === 0 ? (
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
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Khuyến mãi</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((item) => (
                <CartItem key={item._id} cartItem={item} cartId={cart._id} />
              ))}
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
                  {totalPrice && numberWithCommas(totalPrice)}đ
                </span>
              </div>
              <button
                className="btn btn-primary full-width"
                onClick={() => {
                  navigate("/order");
                }}
              >
                CHỐT ĐƠN
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
