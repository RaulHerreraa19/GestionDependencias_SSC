const UserModel = require('../Models/UserModel');
const Response = require('../Utils/Response');
const TypeOfResponse = require('../Utils/Response');
const bcrypt = require('bcryptjs'); 
class UserRepository {
    static async GetAll() {    
        let response = new Response.Response();    
        try {
            const users = await UserModel.getAll();            
            response.data = users;
            response.message = "Usuarios obtenidos correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
            console.log("dsps de metodo getallrepository", response);
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
        try {
            // Aquí podrías agregar validaciones adicionales al usuario si es necesario
            if (!user.Name || !user.LastName || !user.Email || !user.Password || !user.Phone || !user.RoleId) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Faltan campos obligatorios";
                return response;
            }              
            
            //hash password before create 
            console.log("user", user);
            console.log("user.password", user.Password);
            let saltRounds = 10; // Número de rondas de sal                        
            let passwordHash = bcrypt.hashSync(user.Password, saltRounds);
            console.log("passwordHash", passwordHash);
            if (!passwordHash) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Error al encriptar la contraseña";
                return response;
            }            
            // Crear el usuario utilizando el modelo
            user.Name = user.Name.trim(); // Eliminar espacios en blanco al inicio y al final
            user.LastName = user.LastName.trim(); // Eliminar espacios en blanco al inicio y al final
            user.Email = user.Email.trim().toLowerCase(); // Eliminar espacios en blanco y convertir a minúsculas
            user.Phone = user.Phone.trim(); // Eliminar espacios en blanco al inicio y al final
            user.Password = passwordHash;
            user.CreatedAt = new Date(); // Asignar la fecha de creación            
            user.RoleId = parseInt(user.RoleId, 10); // Asegurarse de que RoleId sea un número entero                   
            if (isNaN(user.RoleId)) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "RoleId debe ser un número válido";
                return response;                
            }

            console.log("dsps de crear el usuario", user);
            const newUser = await UserModel.create(user);
            console.log("dsps de metodo createuserrepository", newUser);
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
            const user = await UserModel.findByEmail({ where: { Email: email } });
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