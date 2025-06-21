import { Outlet } from "react-router";
import HeaderAuth from "../../components/auth/header"

export default function Layout(){
  return(
    <>
      <HeaderAuth/>
      {/* <SectionAuth/> */}

      <Outlet/>
    </>
  )
}