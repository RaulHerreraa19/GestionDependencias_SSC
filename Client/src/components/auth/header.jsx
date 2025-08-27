import udcLogo from "../../assets/image-udc.png"

export default function HeaderAuth({isAuth}){
  return(
    <>
      <div className="min-h-[60px] border-e-indigo-50 border-b-[15px] border-b-[#a3bf42] border-b-solid">
        <nav className="p-1 flex">

          <div className="ml-2 flex justify-center items-center">
            <img src={udcLogo} alt="UDC Logo"  className="max-h-[60px] w-44"/>
          </div>
          {isAuth &&
            <div className="self-center ml-auto">
              <ul className="flex list-none gap-5 p-2.5">
                <li><a href="#" className="text-gray-500 hover:text-gray-800">Inicio</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-800">¿Quiénes somos?</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-800">Términos y condiciones</a></li>
              </ul>
            </div>
          }
          
         
        </nav>
      </div>
    </>
  )
}