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
  return (
    <div className="header">
      <ul className="header-info-list row gx-5">
        <li className="col-3">
          <ReChartCard
            title="KHÁCH HÀNG"
            quantity="350,897"
            icon={<ion-icon name="people-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="SẢN PHẨM"
            quantity="350,897"
            icon={<ion-icon name="file-tray-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="ĐƠN HÀNG"
            quantity="350,897"
            icon={<ion-icon name="cube-outline"></ion-icon>}
          />
        </li>
        <li className="col-3">
          <ReChartCard
            title="DOANH THU"
            quantity="350,897"
            icon={<ion-icon name="card-outline"></ion-icon>}
          />
        </li>
      </ul>
    </div>
  );
};

export default Header;
