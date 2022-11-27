import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./app/shared/components/layout/Header";
import Loading from "./app/shared/components/modules/LoadingPage";
const Home = React.lazy(() => import("./app/pages/home/containers/Home"));
const Login = React.lazy(() => import("./app/auth/containers/Login"));
const Register = React.lazy(() => import("./app/auth/containers/Register"));
const Admin = React.lazy(() => import("./app/pages/admin/containers/Admin"));
const CategoryManage = React.lazy(() =>
  import("./app/pages/admin/containers/CategoryManage")
);
const ProductManage = React.lazy(() =>
  import("./app/pages/admin/containers/ProductManage")
);
const OrderManage = React.lazy(() =>
  import("./app/pages/admin/containers/OrderManage")
);
const UserManage = React.lazy(() =>
  import("./app/pages/admin/containers/UserManage")
);
const RevenueChart = React.lazy(() =>
  import("./app/pages/admin/containers/RevenueChart")
);

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* {pageRoutes.map((route, index) => (
            <Route key={index} path={route.path}>
              {<route.component />}
            </Route>
          ))}

          {authRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))} */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="category" element={<CategoryManage />} />
            <Route path="products" element={<ProductManage />} />
            <Route path="users" element={<UserManage />} />
            <Route path="orders" element={<OrderManage />} />
            <Route path="revenue" element={<RevenueChart />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
