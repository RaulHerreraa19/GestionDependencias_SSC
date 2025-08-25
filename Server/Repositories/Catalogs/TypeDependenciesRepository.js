const Response = require('../../Utils/Response');
const db = require('../../Models');
const TipoDependencia = db.TipoDependencia;


class TypeDependenciesRepository {
    static async GetAll() {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDependencies = await TipoDependencia.findAll();
            response.data = typeDependencies;
            response.message = "Tipos de dependencias obtenidas correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener los tipos de dependencias:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener los tipos de dependencias";
        }
        return response;
    }

    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDependency = await TipoDependencia.findByPk(id);
            if (typeDependency) {
                response.data = typeDependency;
                response.message = "Tipo de dependencia obtenida correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de dependencia no encontrada";
            }
        } catch (error) {
            console.error("Error al obtener el tipo de dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el tipo de dependencia";
        }
        return response;
    }

    static async CreateTypeDependency(nombre) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si el tipo de dependencia ya está registrado
            const existingTypeDependency = await TipoDependencia.findOne({ where: { nombre: nombre } });
            if (existingTypeDependency) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El tipo de dependencia ya está registrado";
                return response;
            }
            const newTypeDependency = await TipoDependencia.create({
                nombre,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            response.data = newTypeDependency;
            response.message = "Tipo de dependencia creado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear el tipo de dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear el tipo de dependencia";
        }
        return response;
    }

    static async updateTypeDependency(id, nombre) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDependency = await TipoDependencia.findByPk(id);
            if (!typeDependency) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de dependencia no encontrada";
                return response;
            }
            typeDependency.nombre = nombre || typeDependency.nombre;
            typeDependency.updatedAt = new Date();
            await typeDependency.save();
            response.data = typeDependency;
            response.message = "Tipo de dependencia actualizado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar el tipo de dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar el tipo de dependencia";
        }
        return response;
    }

    static async deleteTypeDependency(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const typeDependency = await TipoDependencia.findByPk(id);
            if (!typeDependency) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Tipo de dependencia no encontrada";
                return response;
            }
            await typeDependency.destroy();
            response.message = "Tipo de dependencia eliminada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar el tipo de dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar el tipo de dependencia";
        }
        return response;
    }
}


module.exports = TypeDependenciesRepository;
