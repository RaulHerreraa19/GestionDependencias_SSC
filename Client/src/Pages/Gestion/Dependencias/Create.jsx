import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createDependencia, validarFormulario, getUtilsDependencias } from "@/api";
import Swal from "sweetalert2";
import { ROUTES } from "../../../routes";

const initialData = {
  nombre: '',
  custom_id: NaN,
  delegacion_id: NaN,
  funcionario_id: NaN,
  tipodependenciaId: NaN
}

export default function CreateDependencia(){

  const [data, setData] = useState(initialData);
  const [utils, setUtils] = useState();
  const navigate = useNavigate();

  function handleAlert(response){
    if(response.valido){
      Swal.fire({icon:'success', text: response.mensaje});
    } else {
      Swal.fire({icon:'error', text: response.mensaje});
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const val = await validarFormulario(data);
    let response;

    console.log(val);

    if (val.valido) {
      response = await createDependencia(data);
      handleAlert(response);
    } else {
      handleAlert(val);
    }

    if (response && response.valido) navigate(ROUTES.GESTION_DEPENDENCIAS);
  }


  useEffect(() => {
  let mounted = true;

  const fetchUtils = async () => {
    try {
      const res = await getUtilsDependencias();
      if (mounted && res?.data) {
        setUtils(res.data);
      }
    } catch (error) {
      console.error("Error al obtener utilidades:", error);
    }
  };

    fetchUtils();

    return () => {
      mounted = false;
    };
  }, []);


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
              <label htmlFor="custom_id" className="inline-block mb-2">Custom ID</label> <br />
              <input type="text" name="custom_id" onChange={(e) => setData({...data, custom_id: e.target.value})} id="custom_id" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"/>
            </>
            <>
              <label htmlFor="Delegacion" className="inline-block mb-2">Delegacion</label> <br />
              <select name="Delegacion" id="Delegacion" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"
                onChange={(e) => setData({...data, delegacion_id: Number(e.target.value)})}
              >
                {utils?.delegaciones?.map((dele) => (
                  <option value={dele.id} key={dele.id}>
                    {dele.nombre}
                  </option>
                ))}
              </select>
            </>
            <>
              <label htmlFor="Funcionario" className="inline-block mb-2">Funcionario</label> <br />
              <select name="Funcionario" id="Funcionario" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"
                onChange={(e) => setData({...data, funcionario_id: Number(e.target.value)})}
              >
                {utils?.funcionarios?.map((funcionario) => (
                  <option value={funcionario.id} key={funcionario.id}>
                    {funcionario.nombre}
                  </option>
                ))}
              </select>
            </>
            <>
              <label htmlFor="Tipo Dependencia" className="inline-block mb-2">Tipo Dependencia</label> <br />
              <select name="Tipo Dependencia" id="Tipo Dependencia" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"
                onChange={(e) => setData({...data, tipodependenciaId: Number(e.target.value)})}
              >
                {utils?.tiposDependencia?.map((tipos) => (
                  <option value={tipos.id} key={tipos.id}>
                    {tipos.nombre}
                  </option>
                ))}
              </select>
            </>

            <button type="submit" className="inline-block w-full py-[0.375rem] px-[1rem] bg-[#5cb85c] text-amber-50 font-normal cursor-pointer hover:bg-emerald-600 border border-transparent rounded">Crear Delegacion</button>
          </div>
        </div>
      </form>
    </>
  )
}