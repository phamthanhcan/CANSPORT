import { Outlet, useLocation } from "react-router-dom";
import AccountNav from "../components/AccountNav";

const Account = () => {
  const { url } = useLocation();
  return (
    <section className="main account-page">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <AccountNav />
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
