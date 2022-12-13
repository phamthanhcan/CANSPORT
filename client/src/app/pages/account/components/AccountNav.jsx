import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../../../assets/images/avatar.png";
import userIcon from "../../../../assets/icons/user.svg";
import purchaseIcon from "../../../../assets/icons/shopping-bag.svg";

const AccountNav = () => {
  const userInfo = useSelector((state) => state.user.data);

  return (
    <div className="account-nav">
      <div className="account-display">
        <img src={userInfo?.userImage || avatar} alt="avatar" />
        <p className="account-name">{userInfo?.name}</p>
      </div>
      <ul className="account-menu">
        <li className="menu-item">
          <div className="menu-item-option">
            <img src={userIcon} alt="user-icon" />
            <p className="txt-sm pl-2">Tài khoản</p>
          </div>
          <div className="menu-child">
            <p className="menu-child-item">
              <Link to="/account/profile" className="menu-child-item">
                Thông tin cá nhân
              </Link>
            </p>
            <p className="menu-child-item">
              <Link to="/account/changepassword" className="menu-child-item">
                Thay đổi mật khẩu
              </Link>
            </p>
          </div>
        </li>
        <li className="menu-item-option">
          <img src={purchaseIcon} alt="purchase-icon" />
          <Link to="/account/purchase" className="txt-sm pl-2">
            Đơn hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountNav;
