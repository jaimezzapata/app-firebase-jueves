import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import ListadoUsuarios from "./components/pages/users/ListadoUsuarios";
import Registro from "./components/pages/auth/Registro";
import EditarUsuarios from "./components/pages/users/EditarUsuarios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/listado-usuarios",
    element: <ListadoUsuarios />,
  },
  {
    path: "/editar",
    element: <EditarUsuarios />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
