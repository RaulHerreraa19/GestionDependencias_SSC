import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router";
import TablaCargos from "../../components/tablaCargos";
import { getFuncinarios } from "@/api";
import { getDelegaciones } from "../../utils/api";
import { use } from "react";

// const departamentos = [
//   { nombre: "Rectoría", param: "rectoria" , },
//   { nombre: "Regulativas", param: "regulativas" },
//   { nombre: "CGD", param: "cgd" },
//   { nombre: "CGI", param: "cgi" },
//   { nombre: "CGECD", param: "cgecd" },
//   { nombre: "CGCS", param: "cgcs" },
//   { nombre: "CGTI", param: "cgti" },
//   { nombre: "CGAF", param: "cgaf" },
// ];


export default function estructura(){

  const [delegaciones, setDelegaciones] = useState([]);
  const [funcionarios, setFuncinarios] = useState([]);
  const { setTitulo, isLogged } = useOutletContext();

  useEffect(() => {
    setTitulo("Funcionarios");
  }, [setTitulo]);

  const fetchData = async () => {
    try {
      const data = await getDelegaciones();
      setDelegaciones(data.data)      
    } catch(error) {
      console.error(error)
    }
  }
  


  useEffect(() => {
    fetchData();
  }, []);

  


  useEffect(() => {
    if (delegaciones.length > 0) {
      handleShowFuncionarosFromDelegacion(delegaciones[0].custom_id);
    }
  }, [delegaciones]);

  const handleShowFuncionarosFromDelegacion = (custom_id) => {
    const delegacion = delegaciones.find(deleg => deleg.custom_id === custom_id);
    if (delegacion) {
      const dependencias = delegacion.dependencias;
      const funcionariosList = dependencias.map(dep => dep.Funcionario).flat().filter(func => func !== null);
      setFuncinarios(funcionariosList);      
    } else {
      setFuncinarios([]);
    }
  };

  
  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] mt-5">Funcionarios</h1>
        <div>
          <nav className="department-nav">
            <ul className="flex justify-self-start ml-[152px] list-none p-0 gap-6 mt-24 ">
                {delegaciones.map((delegacion) => (
                  <li key={delegacion.custom_id}>
                    <button
                      onClick={() => handleShowFuncionarosFromDelegacion(delegacion.custom_id)}
                      className=" inline-block no-underline text-[#52752f] bg-transparent border border-transparent rounded px-3 py-2.5 cursor-pointer hover:text-[#669933] hover:border-gray-300"
                    >{delegacion.nombre}</button>
                  </li>
                ))}
            </ul>
          </nav>
          
          <TablaCargos data={ funcionarios }/>
        </div>                    
    </>
  )
}