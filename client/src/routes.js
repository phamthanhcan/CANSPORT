import Home from "./app/pages/home/containers/Home";
import Login from "./app/auth/containers/Login";
import Register from "./app/auth/containers/Register";
import ProductDetail from "./app/pages/home/containers/ProductDetail";
import Cart from "./app/pages/cart/containers/Cart";
import Account from "./app/pages/account/containers/Account";
import Profile from "./app/pages/account/containers/Profile";
import ChangePassword from "./app/pages/account/containers/ChangePassword";
import Purchase from "./app/pages/account/containers/Purchase";
import ListProductByCategory from "./app/pages/home/containers/ListProductByCategory";
import Order from "./app/pages/cart/containers/Order";
import ListProductBySearch from "./app/pages/home/containers/ListProductBySearch";
import Payment from "./app/pages/cart/containers/Payment";

export const pageRoutes = [
  {
    path: "/",
    element: Home,
    isProtected: false,
  },
  {
    path: "/login",
    element: Login,
    isProtected: false,
  },
  {
    path: "/register",
    element: Register,
    isProtected: false,
  },
  {
    path: "/product/:id",
    element: ProductDetail,
    isProtected: false,
  },
  {
    path: "/listProduct/:id",
    element: ListProductByCategory,
    isProtected: false,
  },
  {
    path: "/search",
    element: ListProductBySearch,
    isProtected: false,
  },
  {
    path: "/cart",
    element: Cart,
    isProtected: true,
    redirect: "/login",
  },
  {
    path: "/order",
    element: Order,
    isProtected: true,
    redirect: "/login",
  },
  {
    path: "/payment",
    element: Payment,
    isProtected: true,
    redirect: "/login",
  },
  {
    path: "/account",
    element: Account,
    isProtected: true,
    redirect: "/login",
    children: [
      {
        path: "profile",
        element: Profile,
        redirect: "/login",
      },
      {
        path: "changePassword",
        element: ChangePassword,
        redirect: "/login",
      },
      {
        path: "purchase",
        element: Purchase,
        redirect: "/login",
      },
    ],
  },
];
