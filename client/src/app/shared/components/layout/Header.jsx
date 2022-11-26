import { useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfor } from "../../../pages/account/account.actions";
import { logout } from "../../../auth/auth.actions";
import Avatar from "../../../../assets/images/avatar.png";
import { isEmpty } from "../../helper/data";

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
  const history = useHistory();

  const [isHome, setIsHome] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const userInfo = useSelector((state) => state.user.data);
  const isAdmin = user?.encode?.role === 1;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    history.push("/");
  }, [dispatch]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, []);

  useEffect(() => {
    if (!isExpriedToken(user?.token || "")) {
      if (isEmpty(userInfo)) {
        dispatch(getUserInfor(user.encode._id));
      }
    }
  }, [dispatch]);

  return (
    <header className={`header ${isAdmin ? "dark" : ""}`}>
      <div className="header-top container">
        <div className="header-left">
          <Link className="logo" to="/">
            <img
              src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/logo.png?1669439764403"
              alt="CANSPORT LOGO"
            />
          </Link>
          {isHome && (
            <input
              className="form-control dark"
              type="text"
              placeholder="Nhập sản phẩm tìm kiếm"
            />
          )}
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
                  <div className="header-cart">
                    <img
                      className="cart-img"
                      src="https://bizweb.dktcdn.net/100/108/842/files/shopping-bag-3.png?v=1654220224817"
                      alt=""
                    />
                    <span className="quantity">0</span>
                    <div>
                      <p className="cart-title">GIỎ HÀNG</p>
                      <p className="cart-quantity">
                        <span>(0)</span>sản phẩm
                      </p>
                    </div>
                  </div>
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
      {!isAdmin && (
        <nav className="navbar">
          <div className="container">
            <ul className="categories-list">
              {categories.map((category) => (
                <li key={category.id} className="category-item">
                  <Link to={category.link}>{category.name}</Link>
                </li>
              ))}
              {/* <li className="category-item">
              <Link to="/">Liên hệ</Link>
            </li> */}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
