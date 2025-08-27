import { Outlet } from "react-router";
import { useEffect, useState } from 'react'
import NavIcons from '../Components/NavIcons';
import NavLinks from '../Components/NavLinks';
import HeaderUDC from '../Components/HeaderUDC';
// import Footer from '../Components/Footer';



export default function Layout() {
  const [titulo, setTitulo] = useState('Dashboard');
  const [isLogged, setIsLogged] = useState(false);

  function getLogged(){
    const roleId = localStorage.getItem('roleId');

    setIsLogged(!!roleId)
  }

  useEffect(() => {
    getLogged()
  }, [])

  return (
    <>
      <NavIcons/>
      <NavLinks/>
      <HeaderUDC breadcumb={ titulo } />

      <Outlet context={{ setTitulo, isLogged }}/>
    </>
  );
}