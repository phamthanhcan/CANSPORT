import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminNav from "../components/AdminNav";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/admin") {
      navigate("/admin/revenue");
    }
  }, [navigate]);
  return (
    <div className="row no-gutter">
      <div className="col-2">
        <AdminNav />
      </div>
      <div className="col-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
