import React from "react";
import Admin from "./components/Admin";
import StoreKeeper from "./components/StoreKeeper";
import SalesReport from "./components/SalesReport";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
