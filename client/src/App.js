import React, { createContext, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./app/shared/components/layout/Footer";
import Header from "./app/shared/components/layout/Header";
import Loading from "./app/shared/components/modules/LoadingPage";
// const Home = React.lazy(() => import("./app/pages/home/containers/Home"));
// const ProductDetail = React.lazy(() =>
//   import("./app/pages/home/containers/ProductDetail")
// );
// const Cart = React.lazy(() => import("./app/pages/cart/containers/Cart"));
// const Login = React.lazy(() => import("./app/auth/containers/Login"));
// const Register = React.lazy(() => import("./app/auth/containers/Register"));
// const Admin = React.lazy(() => import("./app/pages/admin/containers/Admin"));
// const CategoryManage = React.lazy(() =>
//   import("./app/pages/admin/containers/CategoryManage")
// );
// const ProductManage = React.lazy(() =>
//   import("./app/pages/admin/containers/ProductManage")
// );
// const OrderManage = React.lazy(() =>
//   import("./app/pages/admin/containers/OrderManage")
// );
// const UserManage = React.lazy(() =>
//   import("./app/pages/admin/containers/UserManage")
// );
// const RevenueChart = React.lazy(() =>
//   import("./app/pages/admin/containers/RevenueChart")
// );
// const AddProduct = React.lazy(() =>
//   import("./app/pages/admin/containers/AddProduct")
// );

import Home from "./app/pages/home/containers/Home";
import ProductDetail from "./app/pages/home/containers/ProductDetail";
import Cart from "./app/pages/cart/containers/Cart";
import Login from "./app/auth/containers/Login";
import Register from "./app/auth/containers/Register";
import Admin from "./app/pages/admin/containers/Admin";
import CategoryManage from "./app/pages/admin/containers/CategoryManage";
import ProductManage from "./app/pages/admin/containers/ProductManage";
import UserManage from "./app/pages/admin/containers/UserManage";
import OrderManage from "./app/pages/admin/containers/OrderManage";
import RevenueChart from "./app/pages/admin/containers/RevenueChart";
import AddProduct from "./app/pages/admin/containers/AddProduct";
import Order from "./app/pages/cart/containers/Order";
import Payment from "./app/pages/cart/containers/Payment";

export const AppContext = createContext({ name: "" });

function App() {
  const [search, setSearch] = useState("");

  return (
    <AppContext.Provider value={{ name: search }}>
      <div className="App">
        <Header />
        {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="category" element={<CategoryManage />} />
            <Route path="products" element={<ProductManage />} />
            <Route path="users" element={<UserManage />} />
            <Route path="orders" element={<OrderManage />} />
            <Route path="revenue" element={<RevenueChart />} />
            <Route path="products/add" element={<AddProduct />} />
          </Route>
        </Routes>
        {/* </Suspense> */}
        {/* <Footer /> */}
      </div>
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;
