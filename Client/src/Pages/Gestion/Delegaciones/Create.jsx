import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CreateDelegation, getFuncionDelegaciones, validarFormulario } from "@/api";
import Swal from "sweetalert2";
import { ROUTES } from "../../../routes";


const initialData = {
  nombre: '',
  custom_id: '',
  typeId: NaN,
}


export default function CreateDelegacion(){
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const [funDel, setFunDel] = useState([]);

  function handleAlert(response){
    if(response.valido){
      Swal.fire({icon:'success', text: response.mensaje});
    } else {
      Swal.fire({icon:'error', text: response.mensaje});
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const val =  await validarFormulario(data);
    let response;

    if(val.valido){
      response = await CreateDelegation(data);
      handleAlert(response)
    } else {
      handleAlert(val)
    }

    if(response && response.valido) navigate(ROUTES.GESTION_DELEGACIONES);
  }

  useEffect(() => {
    const fetchFuncDel = async () => {
      const fetchData = await getFuncionDelegaciones();
      setFunDel(fetchData.data)
    };

    fetchFuncDel();
  }, []);
  

  return (
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
              <label htmlFor="typeId" className="inline-block mb-2">Funcion Delegacion</label> <br />
              <select name="typeId" id="typeId" className="block w-full py-[0.375rem] px-[0.75rem] text-[#55595c] border border-gray-300 rounded"
                onChange={(e) => setData({...data, typeId: Number(e.target.value)})}
              >
                {funDel.map((dele) => (
                  <option value={dele.id} key={dele.id}>
                    {dele.nombre}
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