import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./layouts/Admin";
import AccountManage from "./layouts/Admin/containers/AccountManage";
import CategoryManage from "./layouts/Admin/containers/CategoryManage";
import ProductManage from "./layouts/Admin/containers/ProductManage";
import RevenueChart from "./layouts/Admin/containers/RevenueChart";
import UserManage from "./layouts/Admin/containers/UserManage";
import Auth from "./layouts/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="rechart" element={<RevenueChart />} />
          <Route path="category" element={<CategoryManage />} />
          <Route path="product" element={<ProductManage />} />
          <Route path="user" element={<UserManage />} />
          <Route path="account" element={<AccountManage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
