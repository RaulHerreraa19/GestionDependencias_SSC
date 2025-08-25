const Response = require('../Utils/Response');
const db = require('../Models');
const Delegacion = db.Delegacion;
const bcrypt = require('bcryptjs'); 


class DelegationsRepository {

    static async GetAll() {    
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const delegations = await Delegacion.findAll();
            response.data = delegations;
            response.message = "Delegaciones obtenidas correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener las delegaciones:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener las delegaciones";
        }
        return response;
    }
    
    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const delegation = await Delegacion.findByPk(id);
            if (delegation) {
                response.data = delegation;
                response.message = "Delegación obtenida correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Delegación no encontrada";
            }
        } catch (error) {
            console.error("Error al obtener la delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener la delegación";
        }
        return response;
    }
    static async CreateDelegation(nombre, custom_id, fun_id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si la delegación ya está registrada
            const existingDelegation = await Delegacion.findOne({ where: { nombre: nombre } });
            if (existingDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "La delegación ya está registrada";
                return response;
            }
            const newDelegation = await Delegacion.create({
                nombre,
                custom_id,
                createdAt: new Date(),
                updatedAt: new Date(),
                fun_delegacionId: fun_id

            });

            response.data = newDelegation;
            response.message = "Delegación creada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear la delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear la delegación";
        }
        return response;
    }
    static async updateDelegation(id, nombre, custom_id, fun_delegacionId) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const delegation = await Delegacion.findByPk(id);
            if (!delegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Delegación no encontrada";
                return response;
            }

            // Verificar si el nuevo nombre ya está en uso por otra delegación
            const existingDelegation = await Delegacion.findOne({ where: { nombre: nombre, id: { [db.Sequelize.Op.ne]: id } } });
            if (existingDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El nombre de la delegación ya está en uso";
                return response;
            }            
            delegation.nombre = nombre;
            delegation.custom_id = custom_id;
            delegation.fun_delegacionId = fun_delegacionId;
            delegation.updatedAt = new Date();            
            await delegation.save();

            response.data = delegation;
            response.message = "Delegación actualizada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar la delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar la delegación";
        }
        return response;
    }            
    static async deleteDelegation(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const delegation = await Delegacion.findByPk(id);
            if (!delegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Delegación no encontrada";
                return response;
            }

            await delegation.destroy();

            response.message = "Delegación eliminada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar la delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar la delegación";
        }
        return response;
    }

}

module.exports = DelegationsRepository;