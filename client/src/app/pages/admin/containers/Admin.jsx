import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AddProduct from "./AddProduct";
import CategoryManage from "./CategoryManage";
import OrderManage from "./OrderManage";
import ProductManage from "./ProductManage";
import RevenueChart from "./RevenueChart";
import UserManage from "./UserManage";

const Admin = () => {
  const { url } = useRouteMatch();
  return (
    <div className="row no-gutter">
      <div className="col-4">
        <AdminNav />
      </div>
      <div className="col-8">
        <Switch>
          <Route path={`${url}/revenue`} exact>
            <RevenueChart />
          </Route>
          <Route path={`${url}/category`} exact>
            <CategoryManage />
          </Route>
          <Route path={`${url}/products`} exact>
            <ProductManage />
          </Route>
          <Route path={`${url}/orders`} exact>
            <OrderManage />
          </Route>
          <Route path={`${url}/products/add`} exact>
            <AddProduct />
          </Route>
          <Route path={`${url}/users`} exact>
            <UserManage />
          </Route>
          <Redirect from={url} to={`${url}/revenue`} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
