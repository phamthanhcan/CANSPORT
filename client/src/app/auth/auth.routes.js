import React from "react";

const Login = React.lazy(() => import("./containers/Login"));
const Register = React.lazy(() => import("./containers/Register"));

const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export default authRoutes;
