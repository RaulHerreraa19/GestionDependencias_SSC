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

      {isLogged ?
        <div>
          <TablaAdministracion data={funcionarios}/>
        </div>
        :
         <div>
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
          
          <TablaCargos data={ funcionarios } />
        </div>
      }
    </>
  );
}
