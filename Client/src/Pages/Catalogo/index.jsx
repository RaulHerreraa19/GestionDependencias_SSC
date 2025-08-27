import { useEffect } from "react";
import { useOutletContext } from "react-router";

export default function Catalogo(){
  const {setTitulo, isLogged} = useOutletContext();

  useEffect(() => {
    setTitulo('Catalogo');

  });

  return(
    <>
      <h1 className="text-center text-6xl text-[#669933] mt-5">Catalogo</h1>

      <section className="w-[80%] m-[20px_auto]">
        <table id="tablecgaf" className="w-full border-collapse">
            <thead>
              <tr className="bg-[#669933] text-white">
                <th scope="col" className="p-[10px] border border-black">Nombre</th>
                <th scope="col" className="p-[10px] border border-black">Cargo</th>
              </tr>
            </thead>
            <tbody>
                {/* {data.map((funcionario, index) => (
                  <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                    <td className="p-[10px] border border-black">{funcionario.nombre}</td>
                    <td className="p-[10px] border border-black">{funcionario.cargo}</td>
                  </tr>
                ))} */}
            </tbody>
        </table>
      </section>
    </>
  )
}