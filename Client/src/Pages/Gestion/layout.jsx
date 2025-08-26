import { Outlet } from "react-router";
import { ModalProvider } from "../../components/modalContext"
import Header from "../../Components/auth/header"

export default function GestionLayout(){
  return(
    <>
      <ModalProvider>
        <Header isAuth={false}/>

        <Outlet/>
      </ModalProvider>
    </>
  )
}