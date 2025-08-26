import { useEffect, useState } from "react";
import { getFuncinarios } from "@/api";
import TablaAdministracion from "../../../components/tablaAdministracion";

export default function IndexFuncionarios(){
  const [funcionarios, setFuncionarios] = useState([]);

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
        console.log(data.data)
        setFuncionarios(data.data)
      } catch(error){
        console.error(error);
      }
    }

    fetchData()
  }, [])
  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] py-5">Funcionarios</h1>

      <TablaAdministracion data={funcionarios} cabeceras={cabeceras}/>
    </>
  )
}