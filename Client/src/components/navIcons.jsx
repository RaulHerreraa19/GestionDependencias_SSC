import imageEmail from '../assets/image-email.png';
import imageCalendario from '../assets/image-calendario.png';
import imageTienda from '../assets/image-tienda.png';
import imageIdioma from '../assets/image-idioma.png';
import imageNegocio from '../assets/image-negocio.png';

export default function NavIcons(){
  return(
    <>
      <nav className="flex p-1 ml-5">
        <ul className="flex list-none gap-5 ml-5 justify-center items-center p-1 ">
          <li>
            <abbr title="Correo Universitario"><a href="#"><img src={imageEmail} alt="Correo" width="24" height="24" /></a></abbr>
          </li>

          <li>
            <abbr title="Calendario Escolar"><a href="#"><img src={imageCalendario} alt="Calendario" width="24" height="24" /></a> </abbr>
          </li>

          <li>
            <abbr title="Mi Tienda Ucol"><a href="#"><img src={imageTienda} alt="Tienda" width="24" height="24" /></a></abbr>
          </li>

          <li>
            <abbr title="English Web"><a href="#"><img src={imageIdioma} alt="Idioma" width="24" height="24" /></a></abbr>
          </li>

          <li>
            <abbr title="Mi Portafolio"><a href="#"><img src={imageNegocio} alt="Negocios" width="24" height="24" /></a></abbr>
          </li>
        </ul>

        <div className="flex ml-auto p-1 justify-center items-center mr-5" role="search">
          <input className="p-2.5 w-60 h-9 rounded-3xl border-solid outline-none shadow-[4px_4px_15px_rgb(143,143,143)] bg-no-repeat bg-[position:95%_50%] bg-[length:20px]" type="search" id="site-search" name="q" placeholder="   Buscar en el sitio" />
        </div>
      </nav>
    </>
  )
}