import { useEffect, useState } from "react"
import { Trash,Pencil,Plus } from 'lucide-react';
import TablaAdministracion from "../../../components/tablaAdministracion"
import { getDelegaciones, editDelegacion, handleDeleteApi } from "@/api";
import { useModal } from "../../../components/modalContext";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import Swal from "sweetalert2";

export default function IndexDelegacion() {
  const [delegaciones, setDelegaciones] = useState([]);
  const { openModal, closeModal, setDataForm } = useModal();
  const navigate = useNavigate();

  const cabeceras = [
    { nombre: 'Nombre' },
    { nombre: 'Tipo de Delegacion' },
    { nombre: 'CSTM-ID' },
    { nombre: 'Fecha de Creacion' },
    { nombre: 'Ultima Modificacion' },
    { nombre: 'Acciones' },
  ];

  // const handleDelete = async (id) => {
  //   try {
  //     //confirmación antes de borrar con swal
  //     const confirmed = await Swal.fire({
  //       title: '¿Estás seguro?',
  //       text: "No podrás deshacer esta acción",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Sí, borrar',
  //       cancelButtonText: 'Cancelar'
  //     });

  //     if (confirmed.isConfirmed) {
  //       await deleteDelegacion(id);
  //       setDelegaciones(delegaciones.filter(delegacion => delegacion.id !== id));
  //     }

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDelegaciones();
        setDelegaciones(data.data)
        console.log("funcionDelegacion:", data.data);
      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, []);
  
  async function handleDelete(delegacion){
    const dataType = {
      ...delegacion,
      type: 'delegacion',
    }
    const response = await handleDeleteApi(dataType);

    if(response.valido){
      Swal.fire({icon:'success', text: response.mensaje})
    } else {
      Swal.fire({icon:'error', text: response.mensaje})
    }
  };

  function goToCreateDelegacion(){
    navigate(ROUTES.CREATE_DELEGACION);
  };

  function formDataModal(data) {
    const handleSubmit = (e) => {
      e.preventDefault();
      editDelegacion(data);
    }

    return (
      <div>
        <h1 className="py-5 text-3xl text-[#669933] text-center">Editar Delegacion</h1>
        <form className="min-w-150 block items-center gap-2 gap-y-3 w-full" onSubmit={handleSubmit}>
          {/* Nombre Delegacion */}
          <div className="py-3 flex items-center">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text"
              id="nombre"
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
              value={data?.nombre || ''}
              onChange={(e) => setDataForm({ ...data, nombre: e.target.value })}
            />
          </div>

          {/* Nombre Delegacion */}
          <div className="py-3 flex items-center">
            <label htmlFor="cstm_id">CSTM-ID:</label>
            <input type="text"
              id="cstm_id"
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
              value={data?.custom_id || ''}
              onChange={(e) => setDataForm({ ...data, custom_id: e.target.value })}
            />
          </div>

          {/* Funcionario Delegacion */}
          <div className="py-3 flex items-center">
            <label htmlFor="funDel">Tipo de Delegacion:</label>
            <input type="text"
              id="funDel"
              className="border border-gray-300 rounded-md py-1 px-2 flex-1 ml-1"
              value={data?.FuncionDelegacion.nombre || ''}
              onChange={(e) => setDataForm({ ...data, FuncionDelegacion: {
                    ...data?.FuncionDelegacion,
                    nombre: e.target.value,
                  },
              })}
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
      <div className="flex items-center justify-center">
        <h1 className="text-center text-6xl text-[#669933] py-5">Delegaciones</h1>
        <button 
          className="py-1 px-3 bg-[#669933] rounded-md cursor-pointer text-white ml-10 mt-2 flex items-center justify-center gap-2"
          onClick={() => navigate(ROUTES.CREATE_DELEGACION)}
        >
          <Plus className="w-4 h-4"/>
          Crear delegacion
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
            {delegaciones.map((delegacion, index) => (
              <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                <td className="p-[10px] border border-black">{delegacion.nombre}</td>
                <td className="p-[10px] border border-black">{delegacion.FuncionDelegacion.nombre}</td>
                <td className="p-[10px] border border-black">{delegacion.custom_id}</td>
                <td className="p-[10px] border border-black">{new Date(delegacion.createdAt).toLocaleDateString("es-ES")}</td>
                <td className="p-[10px] border border-black">{new Date(delegacion.updatedAt).toLocaleDateString("es-ES")}</td>
                <td className='p-[10px] border border-black flex gap-2 justify-center'>                  
                  <button
                    className="p-1 bg-yellow-300 rounded-md cursor-pointer"
                    onClick={() => openModal(({ data }) => formDataModal(data), delegacion)}
                  >
                    <Pencil className='text-white'/>
                  </button>
                  <button 
                    className="p-1 bg-red-300 rounded-md cursor-pointer"
                    onClick={() => handleDelete(delegacion)}
                  >
                    <Trash className='text-white'/>
                  </button>                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* <TablaAdministracion data={delegaciones} cabeceras={cabeceras}/> */}
    </>
  )
}