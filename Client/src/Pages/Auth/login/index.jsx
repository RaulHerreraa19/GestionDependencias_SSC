import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import { useLogin,validarFormulario } from "@/api";
import { useAuth } from "../../../context/authContext";
import Swal from "sweetalert2";

export default function login(){
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setData] = useState({
    correo: '',
    contraseña: '',
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate(ROUTES.INICIO);
    }
  }, [isAuthenticated]);

  async function handleLogin(data){
    const response = await useLogin(data);
    response.valido ? login(response.token, response.user.roleId) 
                    : Swal.fire({icon: "error", title:"Oops...", text:response.mensaje});
    
  }

  return(
    <>
      <div className="flex items-center justify-center bg-[#f5f8ea] shadow-[2px_2px_10px_#0c0c0d1a] h-[76px] relative w-full">
        <span className="text-2xl text-[#777777] absolute left-1/2 transform -translate-x-1/2">INICIAR SESIÓN</span>

        <nav className="ml-auto">
          <ul className="flex list-none gap-5 p-2.5">
            <Link to={ROUTES.AUTH_REGISTER} className="text-gray-500 hover:text-gray-800">
              Registrarse
            </Link>
          </ul>
        </nav>
      </div>
      <div className="grid grid-cols-3 mt-12">
        <form onSubmit={(e) => {
              e.preventDefault(); 
              const resultado = validarFormulario(formData);
              if(!resultado.valido){Swal.fire({icon:"error", title: "Oops...", text: resultado.mensaje}); return}
              handleLogin(formData);
              }}
            className="col-start-2 col-span-1">
          <div className="mb-4">
            <label htmlFor="correo" className="inline-block mb-2">Correo</label> <br />
            <input type="email" name="correo" id="correo" value={formData.correo} onChange={(e) => setData({...formData, correo:e.target.value})}  className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="inline-block mb-2">Contraseña</label> <br />
            <input type="password" name="contrasena" value={formData.contraseña} onChange={(e) => setData({...formData, contraseña: e.target.value})} id="contrasena" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>
          
          <div className="mb-4">
            <button type="submit" className="inline-block w-full py-[0.375rem] px-[1rem] bg-[#5cb85c] text-amber-50 font-normal cursor-pointer hover:bg-emerald-600 border border-transparent rounded">Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </>
  )
}