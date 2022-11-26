import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import pageRoutes from "./app/pages/page.routes";
import authRoutes from "./app/auth/auth.routes";
import Header from "./app/shared/components/layout/Header";
import Loading from "./app/shared/components/modules/Loading";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            {pageRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}

            {authRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
