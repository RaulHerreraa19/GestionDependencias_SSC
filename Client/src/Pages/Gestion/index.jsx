import {ROUTES} from "../../routes"
import { Link } from "react-router";
import { Building, Landmark, Users, ToolCase } from 'lucide-react';
export default function IndexGestion(){
  const router = [
    { nombre: "Delegaciones", ruta: ROUTES.GESTION_DELEGACIONES, icon: <Landmark className="w-30 h-30 p-0"/> },
    { nombre: "Dependencias", ruta: ROUTES.GESTION_DEPENDENCIAS, icon: <Building className="w-30 h-30 p-0"/>},
    { nombre: "Funcionarios", ruta: ROUTES.GESTION_FUNCIONARIOS, icon: <Users className="w-30 h-30 p-0"/>},
    { nombre: "Utilerias", ruta: ROUTES.GESTION_UTILERIAS, icon: <ToolCase className="w-30 h-30 p-0"/>},
  ];

  return(
    <>
      <div className="flex justify-center items-center py-5">
        <h1 className="text-6xl text-[#669933]">Gestion</h1>
      </div>
      

      <div className="px-5 grid grid-cols-4 gap-3">
        {router.map((route) => (
          <Link to={route.ruta} key={route.nombre} className="min-h-40 bg-gray-100 rounded-md block items-center justify-center text-center p-1">
            <div className="items-center flex justify-center">
              {route.icon}
            </div>
            <p className="text-lg font-medium">{route.nombre}</p>
          </Link>
        ))} 
      </div>
    </>
  )
}