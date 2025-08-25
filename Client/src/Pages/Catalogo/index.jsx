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
    </>
  )
}