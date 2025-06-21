import { createBrowserRouter, RouterProvider, } from "react-router";
import Inicio from "./Inicio/index"
import Layout from "./Pages/layout";
import Default from "./Pages/default";
import LayoutAuth from "./Pages/Auth/layout";
import IndexFuncionarios from "./Pages/Funcionarios/index";
import IndexEstructura from "./Pages/EstructuraOrg/index";
import IndexUtilerias from "./Pages/Utilerias/index";
import IndexLogin from "./Pages/Auth/login/index";
import IndexRegister from "./Pages/Auth/register/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [
      {
        index: true,
        element: <Default />,
      },
      {
        path: "login",
        element: <IndexLogin />,
      },
      {
        path: "register",
        element: <IndexRegister />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Default />,
      },
      {
        path: "funcionarios",
        element: <IndexFuncionarios />,
      },
      {
        path: "estructura",
        element: <IndexEstructura />,
      },
      {
        path: "utilerias",
        element: <IndexUtilerias />,
      }
    ]
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}