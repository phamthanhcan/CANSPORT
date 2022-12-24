import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoute } from "./PrivateRoute";

function renderRoute(routes) {
  return routes.map((route, index) => {
    // Redirect router
    if (route.redirect && !route.element) {
      route.element = () => <Navigate to={route.redirect} />;
    }
    const PrivateRoute = privateRoute(route.element);

    return (
      <Route
        key={index}
        path={route.path}
        element={route.isProtected ? <PrivateRoute /> : <route.element />}
      >
        {route.children && renderRoute(route.children)}
      </Route>
    );
  });
}

export const RouterOutlet = ({ routes }) => {
  return <Routes>{renderRoute(routes)}</Routes>;
};
