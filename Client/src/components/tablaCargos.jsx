export default function TablaCargos({data}) {  
  return(
    <>
      <section className="w-[80%] m-[20px_auto]">
        <table id="tablecgaf" className="w-full border-collapse">
            <thead>
              <tr className="bg-[#669933] text-white">
                <th scope="col" className="p-[10px] border border-black">Nombre</th>
                <th scope="col" className="p-[10px] border border-black">Cargo</th>
              </tr>
            </thead>
            <tbody>
                {data.map((funcionario, index) => (
                  <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                    <td className="p-[10px] border border-black">{funcionario.nombre}</td>
                    <td className="p-[10px] border border-black">{funcionario.cargo}</td>
                  </tr>
                ))}
            </tbody>
        </table>
      </section>

      <p className="text-center">Generado el 12/03/25</p>
      <p className="line"></p>
    </>
  )
}