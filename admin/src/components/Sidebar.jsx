import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.webp";

const Sidebar = () => {
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logoImg} alt="logo" />
          <p>CAN SPORT</p>
        </div>
      </div>
      <ul className="sidebar-list">
        <li
          className={`sidebar-item ${
            pathname === "/admin/rechart" ? "active" : ""
          }`}
        >
          <Link className="sidebar-item-link" to="rechart">
            <ion-icon name="analytics-outline"></ion-icon>
            Thống kê
          </Link>
        </li>
        <li
          className={`sidebar-item ${
            pathname === "/admin/category" ? "active" : ""
          }`}
        >
          <Link className="sidebar-item-link" to="category">
            <ion-icon name="list-outline"></ion-icon>
            Danh mục
          </Link>
        </li>
        <li
          className={`sidebar-item ${
            pathname === "/admin/product" ? "active" : ""
          }`}
        >
          <Link className="sidebar-item-link" to="product">
            <ion-icon name="file-tray-outline"></ion-icon>
            Sản phẩm
          </Link>
        </li>
        <li
          className={`sidebar-item ${
            pathname === "/admin/user" ? "active" : ""
          }`}
        >
          <Link className="sidebar-item-link" to="user">
            <ion-icon name="people-outline"></ion-icon>
            Khách hàng
          </Link>
        </li>
        <li
          className={`sidebar-item ${
            pathname === "/admin/order" ? "active" : ""
          }`}
        >
          <Link className="sidebar-item-link" to="order">
            <ion-icon name="cube-outline"></ion-icon>
            Đơn hàng
          </Link>
        </li>
      </ul>
      <div className="sidebar-user">
        <div className="sidebar-user-img">
          <img
            src="https://publichealth.ouhsc.edu/Portals/1055a/Images/no-photo_1.png?ver=2021-06-23-120512-690"
            alt="avatar"
          />
        </div>
        <p className="sidebar-user-name">Pham Thanh Can</p>
      </div>
    </aside>
  );
};

export default Sidebar;
