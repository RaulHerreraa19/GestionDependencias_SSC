import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',  // Por favor checar el vite.config para esta opcion
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useLogin(data){
  console.log(data);
}

export function useRegister(data){
  console.log(data)
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