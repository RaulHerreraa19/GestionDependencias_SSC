import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router";
import TablaCargos from "../../components/tablaCargos";

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

const funcionariosCGAF = [
  {Nombre: "Mtra. Érika Mercedes Ulibarri Ireta", Cargo:"Coordinadora General Administrativa y Financiera"},
  {Nombre: "Dra. Jessica Gabriela Morales Llamas", Cargo: "Tesorera"},   
  {Nombre: "M.A. Priscilia Juliana Álvarez Gutiérrez", Cargo: "Director General de Recursos Humanos"},
  {Nombre: "Arq. Luz María Urzúa Escamilla", Cargo: "Director General de Recursos Materiales"},
  {Nombre: "Mtro. Camilo Alejandro Garcia Morales", Cargo: "Director General de Servicios Universitarios"},
  {Nombre: "Mtra. Liz Georgette Murillo Zamora", Cargo: "Directora General de Administración Escolar"}
];

function getFuncionarios(param){
  fetch(`http://localhost:3000/api/funcionarios?param=${encodeURIComponent(param)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching funcionarios:", error);
    });
}

export default function estructura(){

  const { setTitulo } = useOutletContext();

  useEffect(() => {
    setTitulo('Estructura Organizacional');
  }, [setTitulo]);

  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] mt-5">Estructura Organizacional</h1>

      <nav className="department-nav">
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
      </nav>
      
      <TablaCargos data={ funcionariosCGAF }/>
    </>
  )
}