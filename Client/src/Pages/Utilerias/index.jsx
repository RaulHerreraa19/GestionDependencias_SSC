import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router";
import TablaCargos from "../../components/tablaCargos";
import {getFuncinarios} from '@/api'

const departamentos = [
  { nombre: "Rectoría", param: "rectoria" , },
  { nombre: "Regulativas", param: "regulativas" },
  { nombre: "CGD", param: "cgd" },
  { nombre: "CGI", param: "cgi" },
  { nombre: "CGECD", param: "cgecd" },
  { nombre: "CGCS", param: "cgcs" },
  { nombre: "CGTI", param: "cgti" },
  { nombre: "CGAF", param: "cgaf" },
];

export default function estructura(){

  const { setTitulo, isLogged } = useOutletContext();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    setTitulo('Utilerias');

    const fetchData = async () => {
      try {
        const data = await getFuncinarios();

        setFuncionarios(data.data)
      } catch(error) {
        console.error(error)
      }
    }
      
    fetchData()
  }, [setTitulo]);

  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] mt-5 mb-19">Utilerias</h1>

      {/* <nav className="department-nav">
        <ul className="flex justify-self-start ml-[152px] list-none p-0 gap-6 mt-24 ">
            {departamentos.map((departamento) => (
              <li key={departamento.param}>
                <button
                  onClick={() => getFuncionarios(departamento.param)}
                  className="inline-block no-underline text-[#52752f] bg-transparent border border-transparent rounded px-3 py-2.5 cursor-pointer hover:text-[#669933] hover:border-gray-300"
                >{departamento.nombre}</button>
              </li>
            ))}
        </ul>
      </nav> */}
      
      <TablaCargos data={ funcionarios }/>
    </>
  )
}