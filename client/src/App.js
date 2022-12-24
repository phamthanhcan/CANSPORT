import React, { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { pageRoutes } from "./routes";

import Footer from "./app/shared/components/layout/Footer";
import Header from "./app/shared/components/layout/Header";
import { RouterOutlet } from "./core";
import ScrollToTop from "./app/shared/components/modules/ScrollToTop";

export const AppContext = createContext({ name: "" });

function App() {
  const [search, setSearch] = useState("");

  return (
    <AppContext.Provider value={{ name: search }}>
      <ScrollToTop>
        <div className="App">
          <Header />
          <RouterOutlet routes={pageRoutes} />
          <Footer />
        </div>
      </ScrollToTop>
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;
