const Response = require('../Utils/Response');
const db = require('../Models');
const Funcionarios = db.Funcionario;

class FuncionariosRepository {

    static async GetAll() {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const funcionarios = await Funcionarios.findAll();
            response.data = funcionarios;
            response.message = "Funcionarios obtenidos correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener los funcionarios:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener los funcionarios";
        }
        return response;
    }
    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const funcionario = await Funcionarios.findByPk(id);
            if (funcionario) {
                response.data = funcionario;
                response.message = "Funcionario obtenido correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Funcionario no encontrado";
            }
        } catch (error) {
            console.error("Error al obtener el funcionario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el funcionario";
        }
        return response;
    }

    static async CreateFuncionario(data) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const newFuncionario = await Funcionarios.create(data);
            response.data = newFuncionario;
            response.message = "Funcionario creado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear el funcionario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear el funcionario";
        }
        return response;
    }

    static async updateFuncionario(id, data) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const funcionario = await Funcionarios.findByPk(id);
            if (!funcionario) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Funcionario no encontrado";
                return response;
            }
            await funcionario.update(data);
            response.data = funcionario;
            response.message = "Funcionario actualizado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar el funcionario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar el funcionario";
        }
        return response;
    }

    static async deleteFuncionario(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const funcionario = await Funcionarios.findByPk(id);
            if (!funcionario) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Funcionario no encontrado";
                return response;
            }
            await funcionario.destroy();
            response.message = "Funcionario eliminado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar el funcionario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar el funcionario";
        }
        return response;
    }    
}


module.exports = FuncionariosRepository;