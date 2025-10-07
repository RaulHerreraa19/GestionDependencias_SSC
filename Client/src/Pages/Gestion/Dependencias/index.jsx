import { useEffect, useState } from "react"
import { Trash,Pencil, Plus } from 'lucide-react';
import { getDependencias, editDependencia, handleDeleteApi, getUtilsDependencias } from "@/api";
import TablaAdministracion from "../../../components/tablaAdministracion";
import { useModal } from "../../../components/modalContext";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import Swal from "sweetalert2";

export default function IndexDependencias(){
  const [dependencias, setDependencias] = useState([]);
  const [utils, setUtils] = useState();
  const { openModal, closeModal, setDataForm } = useModal();
  const navigate = useNavigate();

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
    const fetchUtilsDependencia = async () => {
      try{
        const data = await getUtilsDependencias();

        setUtils(data.data);
        // console.log(data.data);
      } catch (error){
        console.error("Error al obtener utilidades:", error);
      }
    }

    fetchUtilsDependencia();
    fetchData();
  }, []);

  async function handleDelete(dependencia){
    const dataType = {
      ...dependencia,
      type: 'dependencia',
    };

    const response = await handleDeleteApi(dataType);

    if(response.valido){
      Swal.fire({icon:'success', text: response.mensaje})
    } else {
      Swal.fire({icon:'error', text: response.mensaje})
    }
  };

  function handleAlert(response){
    if(response.type_of_response == "success"){
      Swal.fire({icon:'success', text: response.message});
    } else {
      Swal.fire({icon:'error', text: response.message});
    }
  };

  function formDataModal(data, utils){
    const handleSubmit = async (e) => {
      e.preventDefault();
      const resp = await editDependencia(data);
      handleAlert(resp);

      if(resp.type_of_response == "success"){
        closeModal()
      }
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
            <select 
              name="delegacion_id" 
              value={data.delegacion_id || ''} 
              onChange={(e) => setDataForm({...data, delegacion_id: e.target.value})}
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
            >
              {utils.delegaciones.map((del) => (
                <option value={del.id} key={del.id}>
                  {del.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Funcionario */}
          <div className="py-3 flex items-center">
            <label htmlFor="funcionario">Funcionario:</label>
            <select 
              name="funcionario_id"
              value={data?.funcionario_id ||  ''}
              onChange={(e) => setDataForm({...data, funcionario_id: e.target.value})}
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
            >
              {utils.funcionarios.map((fun) => (
                <option value={fun.id} key={fun.id}>
                  {fun.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* TipoDependencia */}
          <div className="py-3 flex items-center">
            <label htmlFor="tipoDependencia">Tipo Dependencia:</label>
            <select 
              name="tipoDependencia"
              value={data?.tipodependenciaId ||  ''}
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
              onChange={(e) => setDataForm({...data, tipodependenciaId: e.target.value})}
            >
              {utils.tiposDependencia.map((tipo) => (
                <option value={tipo.id} key={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
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
      <div className="flex items-center justify-center">
        <h1 className="text-center text-6xl text-[#669933] py-5">Dependencias</h1>
        <button 
          className="py-1 px-3 bg-[#669933] rounded-md cursor-pointer text-white ml-10 mt-2 flex items-center justify-center gap-2"
          onClick={() => navigate(ROUTES.CREATE_DEPENDENCIA)}
        >
          <Plus className="w-4 h-4"/>
          Crear dependencia
        </button>
      </div>

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
                  <button 
                    className="bg-yellow-300 rounded-md cursor-pointer p-1" 
                    onClick={() => openModal(({ data }) => formDataModal(data, utils), dependencia)}
                  >
                    <Pencil className='text-white'/>
                  </button>
                  <button 
                    className="bg-red-300 text-white rounded-md cursor-pointer p-1" 
                    onClick={() => handleDelete(dependencia)}
                  >
                    <Trash className='text-white'/>
                  </button>
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