const Response = require('../../Utils/Response');
const db = require('../../Models');
const FuncionDelegacion = db.FuncionDelegacion;


class TypeDelegationsRepository {
    static async GetAll() {    
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDelegations = await FuncionDelegacion.findAll();
            response.data = typeDelegations;
            response.message = "Tipos de delegaciones obtenidas correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener los tipos de delegaciones:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener los tipos de delegaciones";
        }
        return response;
    }    
    
    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDelegation = await FuncionDelegacion.findByPk(id);
            if (typeDelegation) {
                response.data = typeDelegation;
                response.message = "Tipo de delegación obtenida correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de delegación no encontrada";
            }
        } catch (error) {
            console.error("Error al obtener el tipo de delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el tipo de delegación";
        }
        return response;
    }
    static async CreateTypeDelegation(nombre) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si el tipo de delegación ya está registrado
            const existingTypeDelegation = await FuncionDelegacion.findOne({ where: { nombre: nombre } });
            if (existingTypeDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El tipo de delegación ya está registrado";
                return response;
            }
            const newTypeDelegation = await FuncionDelegacion.create({
                nombre,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            response.data = newTypeDelegation;
            response.message = "Tipo de delegación creado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear el tipo de delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear el tipo de delegación";
        }
        return response;
    }

    static async updateTypeDelegation(id, nombre) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDelegation = await FuncionDelegacion.findByPk(id);
            if (!typeDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de delegación no encontrada";
                return response;
            }
            // Verificar si el nuevo nombre ya está en uso por otro registro
            const existingTypeDelegation = await FuncionDelegacion.findOne({ where: { nombre: nombre, id: { [db.Sequelize.Op.ne]: id } } });
            if (existingTypeDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El nombre del tipo de delegación ya está en uso";
                return response;
            }
            typeDelegation.nombre = nombre;
            await typeDelegation.save();
            response.data = typeDelegation;
            response.message = "Tipo de delegación actualizado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar el tipo de delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar el tipo de delegación";
        }
        return response;
    }

    static async deleteTypeDelegation(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDelegation = await FuncionDelegacion.findByPk(id);
            if (!typeDelegation) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de delegación no encontrada";
                return response;
            }
            await typeDelegation.destroy();
            response.message = "Tipo de delegación eliminada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar el tipo de delegación:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar el tipo de delegación";
        }
        return response;
    }
}

module.exports = TypeDelegationsRepository;