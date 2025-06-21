import { Link } from "react-router";
import { ROUTES } from "../../../routes";

const Roles = [
  { name: 'Admin', id: 1 },
  { name: 'User', id: 2 },
  { name: 'Manager', id: 3 }
]

function registerPost(e){
  e.preventDefault();

  console.log('hola')
}

export default function register(){
  return(
    <>
      <div className="flex items-center justify-center bg-[#f5f8ea] shadow-[2px_2px_10px_#0c0c0d1a] h-[76px] relative w-full">
        <span className="text-2xl text-[#777777] absolute left-1/2 transform -translate-x-1/2">REGISTRARSE</span>

        <nav className="ml-auto">
          <ul className="flex list-none gap-5 p-2.5">
            <Link to={ROUTES.AUTH_LOGIN} className="text-gray-500 hover:text-gray-800">
              Iniciar Sesión
            </Link>
            <li><a href="#" className="text-gray-500 hover:text-gray-800">Registrarse</a></li>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-3 mt-12">
        <form onSubmit={ registerPost } className="col-start-2 col-span-1">
          <div className="mb-4">
            <label htmlFor="nombre" className="inline-block mb-2">Nombre</label> <br />
            <input type="text" name="nombre" id="nombre" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="apellido" className="inline-block mb-2">Apellido</label> <br />
            <input type="text" name="apellido" id="apellido" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="inline-block mb-2">Telefono</label> <br />
            <input 
              type="text" 
              name="telefono" 
              id="telefono" 
              placeholder="XXX-XXX-XXXX" 
              maxLength={12} 
              onChange={ (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 3 && value.length <= 6) {
                  value = value.slice(0, 3) + '-' + value.slice(3);
                } else if (value.length > 6) {
                  value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
                e.target.value = value;
              } }
              className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="inline-block mb-2">Contraseña</label> <br />
            <input type="password" name="contrasena" id="contrasena" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena2" className="inline-block mb-2">Confirmar Contraseña</label> <br />
            <input type="password" name="contrasena2" id="contrasena2" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
          </div>

          <div className="mb-4">
            <label htmlFor="roles">Rol en la Pagina</label> <br />
            <select name="roles" id="roles" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded">
              <option value="" disabled>Select Rol</option>
              {Roles.map(rol => (
                <option value={rol.id} key={rol.id}>{rol.name}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <button className="inline-block w-full py-[0.375rem] px-[1rem] bg-[#5cb85c] text-amber-50 font-normal cursor-pointer hover:bg-emerald-600 border border-transparent rounded">Registrarse</button>
          </div>
        </form>
      </div>
    </>
  )
}