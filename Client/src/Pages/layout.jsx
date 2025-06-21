import { Outlet } from "react-router";
import { useState } from 'react'
import NavIcons from '../Components/NavIcons';
import NavLinks from '../Components/NavLinks';
import HeaderUDC from '../Components/HeaderUDC';
// import Footer from '../Components/Footer';


export default function Layout() {
  const [titulo, setTitulo] = useState('Dashboard');

  return (
    <>
      <NavIcons/>
      <NavLinks/>
      <HeaderUDC breadcumb={ titulo } />

      <Outlet context={{ setTitulo }}/>
    </>
  );
}