import { Link, useNavigate } from "react-router";
import { ROUTES } from "../routes";
import { useAuth } from "../context/authContext";
export default function inicio(){
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(){
    logout();
    navigate(ROUTES.AUTH_LOGIN, {replace: true});
  }

  return(
    <>
      <div className="w-64 h-screen bg-indigo-300 text-gray-50 fixed p-5 transition-transform">

        <h2 className="text-center mb-5 text-3xl">Inicio</h2>

        <ul className="list-none p-0 flex flex-col h-full">
          <Link to={ROUTES.DASHBOARD_FUNCIONARIOS} className="text-gray-50 no-underline block p-2.5 rounded-md duration-300 hover:bg-indigo-400">
            Funcionarios
          </Link>
          <Link to={ROUTES.DASHBOARD_ESTRUCTURA_ORGANIZACIONAL} className="text-gray-50 no-underline block p-2.5 rounded-md duration-300 hover:bg-indigo-400">
            Estructura Organizacional
          </Link>
          <Link to={ROUTES.DASHBOARD_UTILERIAS} className="text-gray-50 no-underline block p-2.5 rounded-md duration-300 hover:bg-indigo-400">
            Utilerias
          </Link>
          <li className="mt-auto mb-20">
            <button className="text-gray-50 block p-2.5 rounded-md duration-300 hover:bg-indigo-400 w-full cursor-pointer" onClick={handleLogout}>
              Cerrar Sesion
            </button>
          </li>
        </ul>

      </div>

      <div className="ml-60 p-5 pl-9 transition-[margin-left] duration-300">

        <header className="flex items-center justify-center bg-indigo-300 text-gray-50 p-4 rounded-md relative">
          <button className="bg-none border-none text-[#fffefe] text-2xl cursor-pointer left-[15px]">☰</button>
          <h1 className="text-center flex-grow text-3xl">Servicio Social Constitucional</h1>
        </header>

        <section className="grid grid-cols-3 gap-5 mt-5">
          <div className="card"> </div>
          <div className="card"> </div>
          <div className="card"> </div>
        </section>

      </div>
    </>
  )
}