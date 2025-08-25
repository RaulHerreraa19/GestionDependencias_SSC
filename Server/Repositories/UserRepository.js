const Response = require('../Utils/Response');
const db = require('../Models');
const User = db.User;
const bcrypt = require('bcryptjs'); 
class UserRepository {

    static async GetAll() {    
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const users = await User.findAll();
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
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const user = await User.findByPk(id);
            if (user) {
                response.data = user;
                response.message = "Usuario obtenido correctamente";
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

    static async CreateUser(nombre, apellido, email, telefono, password, roleId) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si el correo ya está registrado
            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El correo ya está registrado";
                return response;
            }

            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                nombre,
                apellido,
                email,
                telefono,
                password: hashedPassword,
                roleId,
                createdAt: new Date(),
                updatedAt: new Date()                
            });
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

    static async updateUser(id, nombre, apellido, email, telefono, roleId) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        if((!id) || (!nombre) || (!apellido) || (!email) || (!telefono) || (!roleId)){
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Los campos nombre, apellido, email, telefono y roleId son obligatorios";
            return response;
        }
        try {
            const user = await User.findByPk(id);
            if (!user) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Usuario no encontrado";
                return response;
            }            
            // Actualizar los campos si se proporcionan nuevos valores
            user.nombre = nombre || user.nombre;
            user.apellido = apellido || user.apellido;
            user.email = email || user.email;
            user.telefono = telefono || user.telefono;
            user.roleId = roleId || user.roleId;
            user.updatedAt = new Date();                        
            await user.save();

            response.data = user;
            response.message = "Usuario actualizado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar el usuario";
        }
        return response;
    }

    static async deleteUser(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Usuario no encontrado";
                return response;
            }
            await user.destroy();
            response.message = "Usuario eliminado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar el usuario";
        }
        return response;
    }    

    static async GetByEmail(email) {
      let response = new Response.Response();
      let TypeOfResponse = Response.TypeOfResponse;
      
      try {
          const user = await User.findOne({
            where: {
              email: email
            }
          });
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