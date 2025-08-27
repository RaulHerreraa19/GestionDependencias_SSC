import {ROUTES} from "../../routes"
import { Link } from "react-router";

export default function IndexGestion(){
  const router = [
    { nombre: "Delegaciones", ruta: ROUTES.GESTION_DELEGACIONES},
    { nombre: "Dependencias", ruta: ROUTES.GESTION_DEPENDENCIAS},
    { nombre: "Funcionarios", ruta: ROUTES.GESTION_FUNCIONARIOS},
    { nombre: "Utilerias", ruta: ROUTES.GESTION_UTILERIAS},
  ];

  return(
    <>
      <div className="flex justify-center items-center py-5">
        <h1 className="text-6xl text-[#669933]">Gestion</h1>
      </div>
      

      <div className="px-5 grid grid-cols-4 gap-3">
        {router.map((route) => (
          <Link to={route.ruta} key={route.nombre} className="min-h-10 bg-gray-100 rounded-md flex items-center justify-center">
            {route.nombre}
          </Link>
        ))} 
      </div>
    </>
  )
}