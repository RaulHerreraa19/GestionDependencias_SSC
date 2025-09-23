import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router";
import TablaCargos from "../../components/tablaCargos";
import TablaAdministracion from "../../components/tablaAdministracion";
import { getFuncinarios } from "@/api";

const departamentos = [
  { nombre: "Rectoría", param: "rectoria" , },
  { nombre: "Regulativas", param: "regulativas" },
  { nombre: "CGD", param: "cgd" },
  { nombre: "CGI", param: "cgi" },
  { nombre: "CGE", param: "cge" },
  { nombre: "CGCS", param: "cgcs" },
  { nombre: "CGTI", param: "cgti" },
  { nombre: "CGAF", param: "cgaf" },
  { nombre: "CGV", param: "cgv" },
];

// function getFuncionarios(param){
//   fetch(`http://localhost:3000/api/funcionarios?param=${encodeURIComponent(param)}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       funcionarios.push(data.data)
//     })
//     .catch(error => {
//       console.error("Error fetching funcionarios:", error);
//     });
// }




export default function Funcionarios() {

  const { setTitulo, isLogged } = useOutletContext();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    setTitulo('Funcionarios');

    const fetchData = async () =>{
      try{
        const data = await getFuncinarios();

        setFuncionarios(data.data)
      } catch(error) {
        console.error(error)
      }
    }
    
    fetchData();
  }, [setTitulo]);

  return (
    <>
      <h1 className="text-center text-6xl text-[#669933] mt-5">Funcionarios</h1>

      

    
    </>
  );
}
