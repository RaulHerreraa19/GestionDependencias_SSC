import udcLogo from '../assets/image-udc.png';

export default function HeaderUDC({breadcumb}) {
  return (
    <>
      <header className="flex justify-between  bg-[#669933] p-0 shadow-[2px_2px_10px_rgba(0,0,0,0.4)] h-20 px-8 ">

        <div className="absolute left-1/2 transform -translate-x-1/2 w-80 h-[100px] bg-white rounded-b-[110px] shadow-[2px_2px_10px_#0c0c0d1a] flex justify-center items-center">
          <img src={udcLogo} alt="UDC Logo" width="218" height="75" className="absolute" />
        </div>

        <nav className='self-center ml-auto'>
          <ul className="flex list-none gap-5 p-2.5">
            <li><a href="#" className="text-amber-50 font-bold hover:text-emerald-50">Estudiante</a></li>
            <li><a href="#" className="text-amber-50 font-bold hover:text-emerald-50">Docente</a></li>
            <li><a href="#" className="text-amber-50 font-bold hover:text-emerald-50">Egresado</a></li>
            <li><a href="#" className="text-amber-50 font-bold hover:text-emerald-50">Personal</a></li>
          </ul>
        </nav>
      </header>


      <nav className='p-[10px] text-[15px] ml-0 sm:ml-[10px] md:ml-[15px] lg:ml-[20px]'>
        <ul className='list-none flex gap-4'>
          <li><a href="/index.html" className='no-underline text-[#669933] text-sm font-bold'>Inicio /</a></li>
          <li><a href="#" className='no-underline text-[#669933] text-sm font-bold'>Acerca de /</a></li>
          <li><a href="#" className='no-underline text-[#669933] text-sm font-bold'>{ breadcumb }</a></li>
        </ul>
      </nav>
    </>
  );
}