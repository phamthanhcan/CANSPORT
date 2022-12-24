import { useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfor } from "../../../pages/account/account.actions";
import { logout } from "../../../auth/auth.actions";
import Avatar from "../../../../assets/images/avatar.png";
import { isEmpty } from "../../helper/data";
import { getCartByUser } from "../../../pages/cart/cart.actions";
import { getListCategory } from "../../../pages/home/home.actions";

const categories = [
  {
    id: 1,
    name: "Giày bóng đá",
    link: "/",
  },
  {
    id: 2,
    name: "Quần áo bóng đá",
    link: "/",
  },
  {
    id: 3,
    name: "Găng tay",
    link: "/",
  },
  {
    id: 4,
    name: "Đồ chính hãng",
    link: "/",
  },
  {
    id: 5,
    name: "Phụ kiện khác",
    link: "/",
  },
];

export const isExpriedToken = (token) => {
  if (!token) return true;
  const token_decode = jwt_decode(token);
  if ((token_decode.exp || 0) < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.data);
  const userInfo = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);
  const categories = useSelector((state) => state.category.data);
  const isAdmin = user?.encode?.role === 1;

  const totalQuantityProductInCart = () => {
    return cart?.products?.reduce((sum, item) => {
      return sum + +item.quantity;
    }, 0);
  };

  console.log({ categories });

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  useEffect(() => {
    if (!isExpriedToken(user?.token || "")) {
      if (isEmpty(cart)) {
        dispatch(getCartByUser(user.encode._id));
      }
      if (isEmpty(userInfo)) {
        dispatch(getUserInfor(user.encode._id));
      }
    }
  }, [dispatch]);

  return (
    <header className={`header`}>
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <Link className="logo" to={`${isAdmin ? "/admin" : "/"}`}>
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/logo.png?1669439764403"
                alt="CANSPORT LOGO"
              />
            </Link>
            <input
              className="form-control dark"
              type="text"
              placeholder="Nhập sản phẩm tìm kiếm"
            />
          </div>
          <div className="header-right">
            {(user?.token ? isExpriedToken(user.token || "") : true) ? (
              <>
                <Link to="/login" className="btn btn-primary btn-sm mr-3">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-secondary btn-sm">
                  Đăng ký
                </Link>
              </>
            ) : (
              <>
                <div className="header-account">
                  <div className="account">
                    <Link className="account-link" to="/account">
                      <img
                        className="account-img"
                        src={userInfo?.imageUrl || Avatar}
                        alt=""
                      />
                      <p className="account-name">{userInfo?.name}</p>
                    </Link>
                    /
                    <button className="btn btn-sm" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                </div>
                {!isAdmin && (
                  <>
                    <Link to="/cart" className="header-cart">
                      <img
                        className="cart-img"
                        src="https://bizweb.dktcdn.net/100/108/842/files/shopping-bag-3.png?v=1654220224817"
                        alt=""
                      />
                      <span className="quantity">
                        {totalQuantityProductInCart() || 0}
                      </span>
                      <div>
                        <p className="cart-title">GIỎ HÀNG</p>
                        <p className="cart-quantity">
                          <span>{totalQuantityProductInCart() || 0}</span>sản
                          phẩm
                        </p>
                      </div>
                    </Link>
                    <Link to="/account/purchase" className="btn-purchase">
                      <img
                        src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/kiem-tra-don-hang.png?1669439764403"
                        alt=""
                      />
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <ul className="categories-list">
            {categories &&
              categories.map((category) => (
                <li className="category-item" key={category.id}>
                  <Link to={`listProduct/${category.id}`}>{category.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
