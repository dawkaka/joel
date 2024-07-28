import React, { useEffect, useState } from "react";
import Admin from "./components/Admin";
import StoreKeeper from "./components/StoreKeeper";
import SalesReport from "./components/SalesReport";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context";
import { Login } from "./components/Config";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/",
    element: <StoreKeeper />,
  },
  {
    path: "/sales",
    element: <SalesReport />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasSetup, setHasSetup] = useState(false);
  const [storeName, setStoreName] = useState("Store");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    const storedHasSetup = localStorage.getItem("hasSetup");
    if (storedHasSetup === "true") {
      setHasSetup(true);
    }
    const storeName = localStorage.getItem("storeName");
    if (storeName) {
      setStoreName(storeName);
    }
  }, [hasSetup, isAdmin]);

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        hasSetup,
        setHasSetup,
        storeName,
        setStoreName,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
