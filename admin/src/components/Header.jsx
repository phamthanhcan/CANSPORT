import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListProducts,
  getListUser,
  getOrders,
} from "../layouts/Admin/actions";
import { getApi } from "../libs/api";
import { numberWithCommas } from "../libs/helper";

const ReChartCard = (props) => {
  return (
    <div className="rechart-cart">
      <div>
        <h2 className="rechart-cart-title">{props.title}</h2>
        <p className="rechart-cart-quantity">{props.quantity}</p>
      </div>
      <div className="rechart-cart-icon">{props.icon}</div>
    </div>
  );
};

const Header = () => {
  const dispatch = useDispatch();

  const totalUsers = useSelector((state) => state.user.totalItems);
  const totalProducts = useSelector((state) => state.product.totalItems);
  const totalOrders = useSelector((state) => state.order.totalItems);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    getApi(["order", "renevue"]).then((res) =>
      setTotalRevenue(res.data?.totalRevenue)
    );
  }, []);

  useEffect(() => {
    dispatch(getListUser(0, 10, "", true));
    dispatch(getListProducts(0, 0, "", "", true));
    dispatch(getOrders(0, 5));
  }, []);

  console.log(totalRevenue);

  return (
    <div className="header">
      <ul className="header-info-list row gx-5">
        <li className="col-3">
          <ReChartCard
            title="KHÁCH HÀNG"
            quantity={totalUsers}
            icon={<ion-icon name="people-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="SẢN PHẨM"
            quantity={totalProducts}
            icon={<ion-icon name="file-tray-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="ĐƠN HÀNG"
            quantity={totalOrders}
            icon={<ion-icon name="cube-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="DOANH THU"
            quantity={`${totalRevenue && numberWithCommas(totalRevenue)}đ`}
            icon={<ion-icon name="card-outline"></ion-icon>}
          />
        </li>
      </ul>
    </div>
  );
};

export default Header;
