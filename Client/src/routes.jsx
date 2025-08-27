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
import IndexCatalogo from "./Pages/Catalogo/index"
import LayoutGestion from "./Pages/Gestion/layout"
import IndexDelegacionGestion from "./Pages/Gestion/Delegaciones/index";
import IndexDependenciasGestion from "./Pages/Gestion/Dependencias/index"
import IndexFuncionariosGestion from "./Pages/Gestion/Funcionarios/index"
import IndexUtileriasGestion from "./Pages/Gestion/Utilerias/index"
import IndexGestion from "./Pages/Gestion/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <Inicio />
      // </ProtectedRoute>
    )
  },
  {
    path: "/gestion",
    element: (
      <ProtectedRoute>
        <LayoutGestion/>
      </ProtectedRoute>
    ),
    children:[
      {
        index: true,
        element: <IndexGestion/>
      },
      {
        index: true,
        path: "delegaciones",
        element: <IndexDelegacionGestion/>
      },
      {
        path: "dependencias",
        element: <IndexDependenciasGestion/>
      },
      {
        path: "funcionarios",
        element: <IndexFuncionariosGestion/>
      },
      {
        path: "utilerias",
        element: <IndexUtileriasGestion/>
      }
    ]
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
        element:(
          <ProtectedRoute>
            <IndexRegister />
          </ProtectedRoute>
        )
      },
    ]
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
        <Layout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <IndexFuncionarios />,
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
      },
      {
        path:"catalogo",
        element:(
          <ProtectedRoute>
            <IndexCatalogo />
          </ProtectedRoute>
        )
      }
    ]
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}