import { Trash,Pencil } from 'lucide-react';
import { useState } from 'react';


export default function TablaAdministracion({data}){
  const [isOpen, setIsOpen] = useState(false);
const [selectedFuncionario, setSelectedFuncionario] = useState(null);

const handleEdit = (funcionario) => {
  setSelectedFuncionario(funcionario);
  setIsOpen(true);
  console.log('click')
}

  return(
    <>
      <section id="tableAdmin" className="w-[80%] m-[20px_auto]">
        <table className="w-full border-collapse">
          <thead>
            <th scope="col" className="p-[10px] border border-black">Nombre</th>
            <th scope="col" className="p-[10px] border border-black">Cargo</th>
            <th scope="col" className="p-[10px] border border-black">Acciones</th>
          </thead>
          <tbody>
            {data.map((funcionario, index) => (
              <tr key={index} className="odd:bg-[#D9D9D9] even:bg-white">
                <td className="p-[10px] border border-black">{funcionario.nombre}</td>
                <td className="p-[10px] border border-black">{funcionario.cargo}</td>
                <td className='p-[10px] border border-black flex gap-2 justify-center'>
                  <Trash className='bg-red-300 text-white rounded-md'/>
                  <Pencil className='bg-yellow-300 text-white rounded-md' onClick={() => handleEdit(funcionario)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}