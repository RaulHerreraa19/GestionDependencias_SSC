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

    // if(token){
    //   localStorage.setItem('token', token);
    // }

    return {valido: true, mensaje: 'Exito al Iniciar Sesion', user: user, token: token};
  } catch (error) {
    // console.error('Error en el Login : ', error);
    return {valido: false, mensaje: error.response.data.message};
  }
}

export async function useRegister(data){
  try {
    const response = await apiClient.post('/auth/register', data);

    // if(!response.valido){
    //   return {valido: false, mensaje: response.mensaje}
    // }

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

export async function getFuncinarios(){
  try{
    const response = await apiClient.get('/funcionarios');

    return response.data;
  } catch (error) {
    console.error('Eror getDepartamentos', error);
    throw error;
  }
}

export async function editFuncionario(funcionario){
  try{
    const id = funcionario.id;
    const response = await apiClient.put(`/funcionarios/${id}`, funcionario);

    return response.data
  } catch(error){
    console.error('Error al editar Funcionario')
    throw error;
  }
}

export async function getDelegaciones(){
  try{
    const response = await apiClient.get("/delegations");

    return response.data;
  } catch(error){
    console.error('Error en obtener Delegaciones', error);
    throw error;
  }
}

export async function editDelegacion(delegacion){
  try{
    const id = delegacion.id;
    const response = await apiClient.put(`/delegations/${id}`, delegacion);

    return response.data
  } catch(error){
    console.error(error);
    throw error;
  }
}

export async function deleteDelegacion(id) {
  try {
    const response = await apiClient.delete(`/delegations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar Delegacion', error);
    throw error;
  }
}


export async function getDependencias() {
  try{
    const response = await apiClient.get("/dependencies");

    return response.data;
  } catch(error){
    console.error('Error en obtener Dependencias', error);
    throw error;
  }
}

export async function editDependencia(dependencia){
  try{
    const id = dependencia.id;
    const response = await apiClient.put(`/dependencies/${id}`, dependencia);

    return response.data
  } catch(error){
    console.error(error);
    throw error;
  }
}

export async function getUtilerias() {
  try{
    const response = await apiClient.get("/dependencies");

    return response.data;
  } catch(error){
    console.error('Error en obtener Dependencias', error);
    throw error;
  }
}

export async function handleDeleteApi(data){
  const { type, id } = data;
  let route = '';

  if(type === 'delegacion'){
    route = `/delegations/delete`
  } 
  else if (type === 'dependencia'){
    route = `/dependencies/delete`
  }
  else if (type === 'funcionario'){
    route = `/funcionarios/delete`
  }

  try{
    const response = await apiClient.delete(route, { data: { id } });

    return {valido: true, mensaje: 'Exito al Eliminar'};
  } catch(error){
    return {valido: false, mensaje: error.response.data.message};
  }
}