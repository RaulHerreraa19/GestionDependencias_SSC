import { createBrowserRouter, RouterProvider, } from "react-router";
import ProtectedRoute from "./components/auth/protectRoute";
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
    element: (
      <ProtectedRoute>
        <Inicio />,
      </ProtectedRoute>
    )
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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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