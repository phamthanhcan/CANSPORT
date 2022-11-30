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
    <div className="admin-wrapper">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default Admin;
