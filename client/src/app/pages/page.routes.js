import React from "react";

const Home = React.lazy(() => import("../pages/home/containers/Home"));
const Admin = React.lazy(() => import("../pages/admin/containers/Admin"));

const pageRoutes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/admin",
    component: Admin,
  },
];

export default pageRoutes;
