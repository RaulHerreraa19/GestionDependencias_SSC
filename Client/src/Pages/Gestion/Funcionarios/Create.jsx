import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createFuncionario, validarFormulario } from "@/api";
import Swal from "sweetalert2";
import { ROUTES } from "../../../routes";

const initialData = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  cargo: '',
}

export default function CreateFuncionario(){
  
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();

  function handleAlert(response){
    if(response.valido){
      Swal.fire({icon:'success', text: response.mensaje});
    } else {
      Swal.fire({icon:'error', text: response.mensaje});
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    const val = validarFormulario(data);
    let response;

    if(val.valido){
      response = await createFuncionario(data);
      handleAlert(response)
    } else {
      handleAlert(val)
    }

    if(response && response.valido) navigate(ROUTES.GESTION_FUNCIONARIOS);
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center p-10">
          <div className="space-y-4 w-100">
            <>
              <label htmlFor="nombre" className="inline-block mb-2">Nombre</label> <br />
              <input type="text" name="nombre"  onChange={(e) => setData({...data, nombre:e.target.value})} id="nombre" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
            </>
            <>
              <label htmlFor="apellido" className="inline-block mb-2">Apellido</label> <br />
              <input type="text" name="apellido" onChange={(e) => setData({...data, apellido: e.target.value})} id="apellido" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
            </>
            <>
              <label htmlFor="correo" className="inline-block mb-2">Correo</label> <br />
              <input type="email" name="correo" onChange={(e) => setData({...data, correo: e.target.value})} id="correo" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
            </>
            <>
              <label htmlFor="telefono" className="inline-block mb-2">Telefono</label> <br />
              <input 
                type="text" 
                name="telefono"
                id="telefono"
                value={data.telefono || ''} 
                placeholder="XXX-XXX-XXXX"
                maxLength={12}  
                className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ''); // quitar todo menos números
                  if (value.length > 3 && value.length <= 6) {
                    value = value.slice(0, 3) + ' ' + value.slice(3);
                  } else if (value.length > 6) {
                    value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                  }
                  setData({...data, telefono: value});
                }}
              />

            </>
            <>
              <label htmlFor="cargo" className="inline-block mb-2">Cargo</label> <br />
              <input type="text" name="cargo" onChange={(e) => setData({...data, cargo: e.target.value})} id="cargo" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
            </>

            <button type="submit" className="inline-block w-full py-[0.375rem] px-[1rem] bg-[#5cb85c] text-amber-50 font-normal cursor-pointer hover:bg-emerald-600 border border-transparent rounded">Crear Delegacion</button>
          </div>
        </div>
      </form>
    </>
  )
}