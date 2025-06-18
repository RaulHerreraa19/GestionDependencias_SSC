const UserModel = require('../Models/UserModel');
const Response = require('../Utils/Response');
const TypeOfResponse = require('../Utils/Response');

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

}

module.exports = UserRepository;