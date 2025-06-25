import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',  // Por favor checar el vite.config para esta opcion
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



export async function useLogin(data){
  try{
    const response = await apiClient.post('/auth/login', data);

    const { token, user } = response.data;

    if(token){
      localStorage.setItem('token', token);
    }

    return {valido: true, mensaje: 'Exito al Iniciar Sesion', user: user};
  } catch (error) {
    // console.error('Error en el Login : ', error);
    return {valido: false, mensaje: error.response.data.message};
  }
}

export async function useRegister(data){
  try {
    const response = await apiClient.post('/auth/register', data);

    if(!response.valido){
      return {valido: false, mensaje: response.mensaje}
    }

    return {valido: true, mensaje: 'Exito al crear usuario'};
  } catch (error) {
    console.error('Error en el register : ', error);

    if(error.response.data?.mensaje == 'Correo en Uso'){
      return {valido: false, mensaje: error.response.data.mensaje};
    }

    return {valido: false, mensaje: 'Hubo un error al crear tu usuario'};
  }
}


export function validarFormulario(data){
  for(const [key, value] of Object.entries(data)){
    if(typeof value == 'string' && value.trim() == ''){
      return {valido: false, mensaje: `El campo ${key} es obligatorio`};
    }
  }

  if("contraseña2" in data){
    if(data.contraseña != data.contraseña2){
      return {valido: false, mensaje: 'Las contraseñas no coinciden'};
    }
  }

  return {valido: true, mensaje: 'Formulario válido'};
}

export async function getDepartamentos(nombre){
  try {
    const response = await apiClient.get('/departamentos', {
      params: { nombre }
    });
    return response.data;
  } catch (error) {
    console.error('Error en fetchDepartamento:', error);
    throw error;
  }
}