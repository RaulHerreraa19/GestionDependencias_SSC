import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import { useRegister, validarFormulario } from "@/api";
import Swal from "sweetalert2";

// const Roles = [
//   { name: 'Admin', id: 1 },
//   { name: 'User', id: 2 },
//   { name: 'Manager', id: 3 }
// ]

export default function register(){
  const navigate = useNavigate();
  const [formData, setData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    contraseña: '',
    contraseña2: '',
    roleId: 2,
  });

  async function handleRegister(data) {
    const res = await useRegister(data);

    !res.valido ? Swal.fire({icon: "error", title:"Oops...", text:res.mensaje}) 
                :  navigate(ROUTES.AUTH_LOGIN);
  };

  return(
    <>
      <div className="flex items-center justify-center bg-[#f5f8ea] shadow-[2px_2px_10px_#0c0c0d1a] h-[76px] relative w-full">
        <span className="text-2xl text-[#777777] absolute left-1/2 transform -translate-x-1/2">REGISTRARSE</span>

        <nav className="ml-auto">
          <ul className="flex list-none gap-5 p-2.5">
            <Link to={ROUTES.AUTH_LOGIN} className="text-gray-500 hover:text-gray-800">
              Iniciar Sesión
            </Link>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-3 mt-12">
        <form onSubmit={(e) => {
                e.preventDefault(); 
                let resultado = validarFormulario(formData);
                if(!resultado.valido){Swal.fire({icon: "error", title:"Oops...", text:resultado.mensaje}); return};
                handleRegister(formData);
              }} 
          className="col-start-2 col-span-1">

          <div className="mb-4">
            <label htmlFor="nombre" className="inline-block mb-2">Nombre</label> <br />
            <input type="text" name="nombre" value={formData.nombre} onChange={(e) => setData({...formData, nombre:e.target.value})} id="nombre" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="apellido" className="inline-block mb-2">Apellido</label> <br />
            <input type="text" name="apellido" id="apellido" value={formData.apellido} onChange={(e) => setData({...formData, apellido:e.target.value})} className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="correo" className="inline-block mb-2">Correo</label> <br />
            <input type="email" name="correo" id="correo" value={formData.correo} onChange={(e) => setData({...formData, correo:e.target.value})} className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="inline-block mb-2">Telefono</label> <br />
            <input 
              type="text" 
              name="telefono" 
              id="telefono" 
              placeholder="XXX-XXX-XXXX" 
              maxLength={12} 
              value={formData.telefono}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 3 && value.length <= 6) {
                  value = value.slice(0, 3) + ' ' + value.slice(3);
                } else if (value.length > 6) {
                  value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                }
                setData({...formData, telefono: value});
              } }
              className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="inline-block mb-2">Contraseña</label> <br />
            <input type="password" name="contrasena" id="contrasena" value={formData.contraseña} onChange={(e) => setData({...formData, contraseña: e.target.value})} className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena2" className="inline-block mb-2">Confirmar Contraseña</label> <br />
            <input type="password" name="contrasena2" id="contrasena2" value={formData.contraseña2} onChange={(e) => setData({...formData, contraseña2: e.target.value})} className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          {/* <div className="mb-4">
            <label htmlFor="roles">Rol en la Pagina</label> <br />
            <select name="roles" id="roles" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded">
              <option value="" disabled>Select Rol</option>
              {Roles.map(rol => (
                <option value={rol.id} key={rol.id}>{rol.name}</option>
              ))}
            </select>
          </div> */}
          
          <div className="mb-4">
            <button type="submit" className="inline-block w-full py-[0.375rem] px-[1rem] bg-[#5cb85c] text-amber-50 font-normal cursor-pointer hover:bg-emerald-600 border border-transparent rounded">Registrarse</button>
          </div>
        </form>
      </div>
    </>
  )
}