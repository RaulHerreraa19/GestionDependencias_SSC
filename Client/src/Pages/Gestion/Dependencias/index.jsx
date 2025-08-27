import { useEffect, useState } from "react"
import { Trash,Pencil } from 'lucide-react';
import { getDependencias, editDependencia } from "@/api";
import TablaAdministracion from "../../../components/tablaAdministracion";
import { useModal } from "../../../components/modalContext";
export default function IndexDependencias(){
  const [dependencias, setDependencias] = useState([]);
  const { openModal, closeModal, setDataForm } = useModal();

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

  function formDataModal(data){
    const handleSubmit = (e) => {
      e.preventDefault();
      editDependencia(data);
    };

    return(
      <div>
        <h1 className="py-5 text-3xl text-[#669933] text-center">Editar Dependencia</h1>
        <form className="min-w-150 block items-center gap-2 gap-y-3 w-full" onSubmit={handleSubmit}>
          {/* Nombre Dependencia */}
          <div className="py-3 flex items-center">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" 
              id="nombre" 
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1" 
              value={data?.nombre ||  ''}
              onChange={(e) => setDataForm({...data, nombre: e.target.value})}
            />
          </div>

          {/* Delegacion */}
          <div className="py-3 flex items-center">
            <label htmlFor="delegacion">Delegacion:</label>
            <input type="text" 
              id="delegacion" 
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1" 
              value={data?.delegacion_id ||  ''}
              onChange={(e) => setDataForm({...data, delegacion_id: e.target.value})}
            />
          </div>

          {/* Funcionario */}
          <div className="py-3 flex items-center">
            <label htmlFor="funcionario">Funcionario:</label>
            <input type="text" 
              id="funcionario" 
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1" 
              value={data?.funcionario_id ||  ''}
              onChange={(e) => setDataForm({...data, funcionario_id: e.target.value})}
            />
          </div>

          {/* TipoDependencia */}
          <div className="py-3 flex items-center">
            <label htmlFor="tipoDependencia">Tipo Dependencia::</label>
            <input type="text" 
              id="tipoDependencia" 
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1" 
              value={data?.tipodependenciaId ||  ''}
              onChange={(e) => setDataForm({...data, tipodependenciaId: e.target.value})}
            />
          </div>

          <div className="flex text-center gap-5 justify-center pt-5">
            <button type="submit" className="px-3 py-1 bg-green-400 text-white max-w-50 rounded-md cursor-pointer">Guardar</button>
            <button type="button" className="px-3 py-1 bg-red-400 text-white max-w-50 rounded-md cursor-pointer" onClick={closeModal}>Cancelar</button>
          </div>

        </form>
      </div>
    )
  }
  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] py-5">Dependencias</h1>

      <section id="tableAdmin" className="w-[80%] m-[20px_auto]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {cabeceras.map((cabecera) => (
                <th scope='col' className='p-[10px] border border-black' key={cabecera.nombre}>{cabecera.nombre}</th>
              ))}
            </tr>
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
                  <Trash className='bg-red-300 text-white rounded-md cursor-pointer'/>
                  <Pencil className='bg-yellow-300 text-white rounded-md cursor-pointer' onClick={() => openModal(({ data }) => formDataModal(data), dependencia)}/>
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