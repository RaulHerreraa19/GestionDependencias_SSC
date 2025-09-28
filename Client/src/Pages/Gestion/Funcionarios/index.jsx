import { useEffect, useState } from "react";
import { Trash,Pencil } from 'lucide-react';
import { useModal } from "../../../components/modalContext";
import { getFuncinarios, editFuncionario, handleDeleteApi } from "@/api";
import TablaAdministracion from "../../../components/tablaAdministracion";

export default function IndexFuncionarios(){
  const [funcionarios, setFuncionarios] = useState([]);
  const {openModal, closeModal, setDataForm} = useModal();

  const cabeceras = [
    {nombre: 'Nombre'},
    {nombre: 'Cargo'},
    {nombre: 'Correo'},
    {nombre: 'Telefono'},
    {nombre: 'Fecha de Creacion'},
    {nombre: 'Ultima Modificacion'},
    {nombre: 'Acciones'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getFuncinarios();
        setFuncionarios(data.data)
      } catch(error){
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function handleDelete(data){
    const dataType = {
      ...data,
      type: 'funcionario'
    };
    handleDeleteApi(dataType)
  }

  

  function formDataModal(data){
    // const [formData, setFormData] = useState(data || {})

    const handleSubmit = (e) => {
      e.preventDefault();
      editFuncionario(data);
    };

    return(
      <div>
        <h1 className="py-5 text-3xl text-[#669933] text-center">Editar Funcionarios</h1>
        <form className="min-w-150 block items-center gap-2 gap-y-3 w-full" onSubmit={handleSubmit}>
          {/* Num de Orden */}
          <div className="py-3 flex items-center">
            <label htmlFor="orden">#Orden:</label>
            <input type="text" 
              id="orden" 
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1" 
              value={data?.orden ||  1}
              onChange={(e) => setDataForm({...data, orden: e.target.value})}
            />
          </div>
          {/* Nombre Funcionario */}
          <div className="py-3 flex items-center">
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" 
              id="nombre" 
              className="border border-gray-300 rounded-md py-1 px-2 ml-1 w-full" 
              value={data?.nombre ||  ''}
              onChange={(e) => setDataForm({...data, nombre: e.target.value})}
            />
          </div>
          {/* Apellido del Funcionario */}
          <div className="py-3 flex items-center">
            <label htmlFor="apellido">Apellido: </label>
            <input type="text" 
              id="apellido" 
              className="border border-gray-300 rounded-md py-1 px-2 ml-1 w-full" 
              value={data?.apellido ||  ''}
              onChange={(e) => setDataForm({...data, apellido: e.target.value})}
            />
          </div>
          {/* Cargo del Funcinario */}
          <div className="py-3 flex items-center">
            <label htmlFor="cargo">Cargo: </label>
            <input type="text" 
              id="cargo" 
              className="border border-gray-300 rounded-md py-1 px-2 ml-1 w-full" 
              value={data?.cargo ||  ''}
              onChange={(e) => setDataForm({...data, cargo: e.target.value})}
            />
          </div>

          {/* Correo del Funcinario */}
          <div className="py-3 flex items-center">
            <label htmlFor="correo">Correo: </label>
            <input type="text" 
              id="correo" 
              className="border border-gray-300 rounded-md py-1 px-2 ml-1 w-full" 
              value={data?.correo ||  ''}
              onChange={(e) => setDataForm({...data, correo: e.target.value})}
            />
          </div>

          {/* Telefono del Funcinario */}
          <div className="py-3 flex items-center">
            <label htmlFor="telefono">Telefono: </label>
            <input type="text" 
              id="telefono" 
              className="border border-gray-300 rounded-md py-1 px-2 ml-1 w-full" 
              value={data?.telefono ||  ''}
              onChange={(e) => setDataForm({...data, telefono: e.target.value})}
            />
          </div>
          
          <div className="flex text-center gap-5 justify-center pt-5">
            <button type="submit" className="px-3 py-1 bg-green-400 text-white max-w-50 rounded-md cursor-pointer">Guardar</button>
            <button type="button" className="px-3 py-1 bg-red-400 text-white max-w-50 rounded-md cursor-pointer" onClick={closeModal}>Cancelar</button>
          </div>
          
        </form>
      </div>
    )
  };

  

  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] py-5">Funcionarios</h1>

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
            {funcionarios.map((funcionario, index) => (
              <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                <td className="p-[10px] border border-black">{funcionario.nombre}</td>
                <td className="p-[10px] border border-black">{funcionario.cargo}</td>
                <td className="p-[10px] border border-black">{funcionario.correo}</td>
                <td className="p-[10px] border border-black">{funcionario.telefono}</td>
                <td className="p-[10px] border border-black">{new Date(funcionario.createdAt).toLocaleDateString("es-ES")}</td>
                <td className="p-[10px] border border-black">{new Date(funcionario.updatedAt).toLocaleDateString("es-ES")}</td>
                <td className='p-[10px] border border-black flex gap-2 justify-center'>
                  <button 
                    className="bg-yellow-300 rounded-md cursor-pointer"
                    onClick={() => openModal(({ data }) => formDataModal(data), funcionario)}
                  >
                    <Pencil className='text-white' />
                  </button>
                  <button 
                    className="bg-red-300 rounded-md cursor-pointer p-1"
                    onClick={handleDelete(funcionario)}
                  >
                    <Trash className='text-white'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* <TablaAdministracion data={funcionarios} cabeceras={cabeceras}/> */}
    </>
  )
}