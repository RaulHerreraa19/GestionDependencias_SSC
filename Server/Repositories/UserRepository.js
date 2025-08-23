const UserModel = require('../Models/user');
const Response = require('../Utils/Response');
const TypeOfResponse = require('../Utils/Response');
const bcrypt = require('bcryptjs'); 
class UserRepository {
    static async GetAll() {    
       let response = new Response.Response();
        try {
            const users = await UserModel.findAll();
            response.data = users;
            response.message = "Usuarios obtenidos correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener los usuarios";
        }
        return response;
    }

    static async GetById(id) {
        let response = new Response.Response();
        try {
            const user = await UserModel.findByPk(id);
            if (user) {
                response.data = user;
                response.message = "Usuario encontrado";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Usuario no encontrado";
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el usuario";
        }
        return response;
    }

    static async createUser(user) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        const { nombre, apellido, correo, telefono, contraseña, roleId } = user;
        try {
            // Aquí podrías agregar validaciones adicionales al usuario si es necesario
            if (!nombre || !apellido || !correo || !contraseña || !telefono || !roleId) {
              response.type_of_response = TypeOfResponse.ERROR;
              response.message = "Faltan campos obligatorios";
              return response;
            }
            
            let saltRounds = 10;        
            let passwordHash = bcrypt.hashSync(contraseña, saltRounds);

            if (!passwordHash) {
              response.type_of_response = TypeOfResponse.ERROR;
              response.message = "Error al encriptar la contraseña";
              return response;
            }            
            // Crear el usuario utilizando el modelo
            const userMapped = {
              Name: nombre.trim(),
              LastName: apellido.trim(),
              Email: correo.trim(),
              Phone: telefono.replace(/\s+/g, ''),
              Password: passwordHash,
              CreatedAt: new Date(),
              RoleId: parseInt(roleId, 10),
            }

            if (isNaN(userMapped.RoleId)) {
              response.type_of_response = TypeOfResponse.ERROR;
              response.message = "RoleId debe ser un número válido";
              return response;                
            }

            const newUser = await UserModel.create(userMapped);

            if (!newUser) {
              response.type_of_response = TypeOfResponse.ERROR;
              response.message = "Error al crear el usuario";
              return response;
            }
            response.data = newUser;
            response.message = "Usuario creado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
          console.error("Error al crear el usuario:", error);
          response.type_of_response = TypeOfResponse.ERROR;
          response.message = "Error al crear el usuario";
        }
        return response;
    }

    static async GetByEmail(email) {
        let response = new Response.Response();
        try {
            const user = await UserModel.findByEmail(email);
            //console.log("dsps de metodo getbyemailrepository", user);
            if (user) {
                response.data = user;
                response.message = "Usuario encontrado";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Usuario no encontrado";
            }
        } catch (error) {
            console.error("Error al obtener el usuario por email:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el usuario por email";
        }
        return response;
    }
}

module.exports = UserRepository;