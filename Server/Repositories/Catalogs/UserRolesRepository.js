const Response = require('../../Utils/Response');
const db = require('../../Models');
const UserRole = db.UserRole;

class UserRolesRepository {
    static async GetAll() {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const userRoles = await UserRole.findAll();
            response.data = userRoles;
            response.message = "Roles de usuario obtenidos correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener los roles de usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener los roles de usuario";
        }
        return response;
    }
    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const userRole = await UserRole.findByPk(id);
            if (userRole) {
                response.data = userRole;
                response.message = "Rol de usuario obtenido correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Rol de usuario no encontrado";
            }
        } catch (error) {
            console.error("Error al obtener el rol de usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener el rol de usuario";
        }
        return response;
    }

    static async CreateUserRole(descripcion) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si el rol de usuario ya está registrado
            const existingUserRole = await UserRole.findOne({ where: { descripcion: descripcion } });
            if (existingUserRole) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El rol de usuario ya está registrado";
                return response;
            }
            const newUserRole = await UserRole.create({
                descripcion,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            response.data = newUserRole;
            response.message = "Rol de usuario creado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear el rol de usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear el rol de usuario";
        }
        return response;
    }

    static async updateUserRole(id, descripcion) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const userRole = await UserRole.findByPk(id);
            if (!userRole) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Rol de usuario no encontrado";
                return response;
            }
            // Verificar si el nuevo nombre ya está en uso por otro rol
            const existingUserRole = await UserRole.findOne({ where: { descripcion: descripcion } });
            if (existingUserRole && existingUserRole.id !== id) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "El nombre del rol de usuario ya está en uso";
                return response;
            }
            userRole.descripcion = descripcion;
            userRole.updatedAt = new Date();
            await userRole.save();
            response.data = userRole;
            response.message = "Rol de usuario actualizado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar el rol de usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar el rol de usuario";
        }
        return response;
    }

    static async deleteUserRole(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const userRole = await UserRole.findByPk(id);
            if (!userRole) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Rol de usuario no encontrado";
                return response;
            }
            await userRole.destroy();
            response.message = "Rol de usuario eliminado correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar el rol de usuario:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar el rol de usuario";
        }
        return response;
    }
}

module.exports = UserRolesRepository;