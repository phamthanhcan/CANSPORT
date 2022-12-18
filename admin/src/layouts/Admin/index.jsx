import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/admin") {
      navigate("/admin/rechart");
    }
  }, [navigate]);

  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
