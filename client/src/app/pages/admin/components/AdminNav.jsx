import dashboardIcon from "../../../../assets/icons/activity.svg";
import productIcon from "../../../../assets/icons/gift.svg";
import categoryIcon from "../../../../assets/icons/copy.svg";
import orderIcon from "../../../../assets/icons/shopping-bag.svg";
import customerIcon from "../../../../assets/icons/users.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminNav = () => {
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <ul className="admin-nav py-5">
      <li
        className={`pd-3 pl-5 ${pathname === "/admin/revenue" ? "active" : ""}`}
      >
        <Link to="/admin/revenue" className="d-flex">
          <img src={dashboardIcon} alt="icon" className="admin-nav-icon" />
          <p className="px-3">Revenue</p>
        </Link>
      </li>
      <li
        className={`pd-3 pl-5 d-flex ${
          pathname?.includes("/admin/products") ? "active" : ""
        }`}
      >
        <Link to="/admin/products" className="d-flex">
          <img src={productIcon} alt="icon" className="admin-nav-icon" />
          <p className="px-3">Product</p>
        </Link>
      </li>
      <li
        className={`pd-3 pl-5 d-flex ${
          pathname === "/admin/category" ? "active" : ""
        }`}
      >
        <Link to="/admin/category" className="d-flex">
          <img src={categoryIcon} alt="icon" className="admin-nav-icon" />
          <p className="px-3">Category</p>
        </Link>
      </li>
      <li
        className={`pd-3 pl-5 d-flex ${
          pathname === "/admin/orders" ? "active" : ""
        }`}
      >
        <Link to="/admin/orders" className="d-flex">
          <img src={orderIcon} alt="icon" className="admin-nav-icon" />
          <p className="px-3">Order</p>
        </Link>
      </li>
      <li
        className={`pd-3 pl-5 d-flex ${
          pathname === "/admin/users" ? "active" : ""
        }`}
      >
        <Link to="/admin/users" className="d-flex">
          <img src={customerIcon} alt="icon" className="admin-nav-icon" />
          <p className="px-3">Customers</p>
        </Link>
      </li>
    </ul>
  );
};

export default AdminNav;
