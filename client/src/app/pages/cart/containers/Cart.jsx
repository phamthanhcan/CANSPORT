import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <main className="main container">
      <h2 className="admin-title">GIỎ HÀNG</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th></th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/108/842/products/189-b0bd19df-a3fe-44ac-a213-9f4a3c84a3d5.jpg?v=1669815257237"
                alt=""
              />
            </td>
            <td>
              <p>Giày Bóng Đá TQ Puma Ultra 1.4 Sakura Trắng Hồng FG 40</p>
            </td>
            <td>
              <span className="price">780.000đ</span>
            </td>
            <td>
              <input
                type="number"
                min="1"
                className="form-control input-quantity"
              />
            </td>
            <td>
              <span className="price">780.000đ</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="cart-actions">
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua hàng
        </Link>
        <div>
          <button className="btn btn-primary mr-3">Xoá giỏ háng</button>
          <button className="btn btn-primary">Cập nhật giỏ hàng</button>
        </div>
      </div>
      <div className="row cart-totals">
        <div className="col-8"></div>
        <div className="col-4">
          <h3 className="cart-totals-title">TỔNG TIỀN</h3>
          <div className="totals">
            <span className="totals-label">Tổng</span>
            <span className="totals-content">780.000đ</span>
          </div>
          <button className="btn btn-primary full-width">Chốt đơn</button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
