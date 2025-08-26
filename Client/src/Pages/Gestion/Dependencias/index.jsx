import { useEffect, useState } from "react"
import { Trash,Pencil } from 'lucide-react';
import { getDependencias } from "@/api";
import TablaAdministracion from "../../../components/tablaAdministracion";
export default function IndexDependencias(){
  const [dependencias, setDependencias] = useState([]);

  const cabeceras = [
    {nombre: 'Nombre'},
    {nombre: 'DelegacionID'},
    {nombre: 'FuncionarioID'},
    {nombre: 'TipoDependenciaID'},
    {nombre: 'CSTM-ID'},
    {nombre: 'Fecha de Creacion'},
    {nombre: 'Ultima Modificacion'},
    {nombre: 'Acciones'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getDependencias();

        setDependencias(data.data);
      } catch(error){
        console.error(error);
      }
    }

    fetchData();
  }, [])
  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] py-5">Dependencias</h1>

      <section id="tableAdmin" className="w-[80%] m-[20px_auto]">
        <table className="w-full border-collapse">
          <thead>
            {cabeceras.map((cabecera) => (
              <th scope='col' className='p-[10px] border border-black' key={cabecera.nombre}>{cabecera.nombre}</th>
            ))}
          </thead>
          <tbody>
            {dependencias.map((dependencia, index) => (
              <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                <td className="p-[10px] border border-black">{dependencia.nombre}</td>
                <td className="p-[10px] border border-black">{dependencia.delegacion_id}</td>
                <td className="p-[10px] border border-black">{dependencia.funcionario_id}</td>
                <td className="p-[10px] border border-black">{dependencia.tipodependenciaId}</td>
                <td className="p-[10px] border border-black">{dependencia.custom_id}</td>
                <td className="p-[10px] border border-black">{new Date(dependencia.createdAt).toLocaleDateString("es-ES")}</td>
                <td className="p-[10px] border border-black">{new Date(dependencia.updatedAt).toLocaleDateString("es-ES")}</td>
                <td className='p-[10px] border border-black flex gap-2 justify-center'>
                  <Trash className='bg-red-300 text-white rounded-md'/>
                  <Pencil className='bg-yellow-300 text-white rounded-md' onClick={() => handleEdit(funcionario)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* <TablaAdministracion data={dependencias} cabeceras={cabeceras}/> */}
    </>
  )
}