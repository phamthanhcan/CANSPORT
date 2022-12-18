import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterOutlet } from "./core";
import Admin from "./layouts/Admin";
import AccountManage from "./layouts/Admin/containers/AccountManage";
import CategoryManage from "./layouts/Admin/containers/CategoryManage";
import ProductManage from "./layouts/Admin/containers/ProductManage";
import RevenueChart from "./layouts/Admin/containers/RevenueChart";
import UserManage from "./layouts/Admin/containers/UserManage";
import Auth from "./layouts/Auth";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <RouterOutlet routes={routes} />
      <ToastContainer />
    </div>
  );
}

export default App;
