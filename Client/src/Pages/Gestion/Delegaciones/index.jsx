import { useEffect, useState } from "react"
import { Trash,Pencil } from 'lucide-react';
import TablaAdministracion from "../../../components/tablaAdministracion"
import { getDelegaciones } from "@/api";
import { useModal } from "../../../components/modalContext";

export default function IndexDelegacion(){
  const [delegaciones, setDelegaciones] = useState([]);
  const {openModal} = useModal();

  const cabeceras = [
    {nombre: 'Nombre'},
    {nombre: 'FuncionDelegacion'},
    {nombre: 'CSTM-ID'},
    {nombre: 'Fecha de Creacion'},
    {nombre: 'Ultima Modificacion'},
    {nombre: 'Acciones'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getDelegaciones();

        setDelegaciones(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [])
  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] py-5">Delegaciones</h1>

      <section id="tableAdmin" className="w-[80%] m-[20px_auto]">
        <table className="w-full border-collapse">
          <thead>
            {cabeceras.map((cabecera) => (
              <th scope='col' className='p-[10px] border border-black' key={cabecera.nombre}>{cabecera.nombre}</th>
            ))}
          </thead>
          <tbody>
            {delegaciones.map((delegacion, index) => (
              <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                <td className="p-[10px] border border-black">{delegacion.nombre}</td>
                <td className="p-[10px] border border-black">{delegacion.fun_delegacionId}</td>
                <td className="p-[10px] border border-black">{delegacion.custom_id}</td>
                <td className="p-[10px] border border-black">{new Date(delegacion.createdAt).toLocaleDateString("es-ES")}</td>
                <td className="p-[10px] border border-black">{new Date(delegacion.updatedAt).toLocaleDateString("es-ES")}</td>
                <td className='p-[10px] border border-black flex gap-2 justify-center'>
                  <Trash className='bg-red-300 text-white rounded-md'/>
                  <Pencil className='bg-yellow-300 text-white rounded-md' onClick={() => handleEdit(funcionario)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button onClick={() => openModal(
        <div>Hola desde el modal</div>
      )}
      >
        Abrir Modal
      </button>
      
      {/* <TablaAdministracion data={delegaciones} cabeceras={cabeceras}/> */}
    </>
  )
}