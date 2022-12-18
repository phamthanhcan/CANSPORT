import Admin from "./layouts/Admin";
import AccountManage from "./layouts/Admin/containers/AccountManage";
import CategoryManage from "./layouts/Admin/containers/CategoryManage";
import ProductManage from "./layouts/Admin/containers/ProductManage";
import RevenueChart from "./layouts/Admin/containers/RevenueChart";
import UserManage from "./layouts/Admin/containers/UserManage";
import Auth from "./layouts/Auth";

export const routes = [
  {
    path: "/",
    element: Auth,
    isProtected: false,
  },
  {
    path: "/admin",
    element: Admin,
    children: [
      {
        path: "rechart",
        element: RevenueChart,
        isProtected: true,
        redirect: "/",
      },
      {
        path: "product",
        element: ProductManage,
        isProtected: true,
        redirect: "/",
      },
      {
        path: "category",
        element: CategoryManage,
        isProtected: true,
        redirect: "/",
      },
      {
        path: "user",
        element: UserManage,
        isProtected: true,
        redirect: "/",
      },
      {
        path: "account",
        element: AccountManage,
        isProtected: true,
        redirect: "/",
      },
    ],
  },
];
