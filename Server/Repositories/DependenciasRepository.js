const Response = require('../Utils/Response');
const db = require('../Models');
const Dependencias = db.Dependencia;

class DependenciasRepository {

    static async GetAll() {    
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const dependencias = await Dependencias.findAll();
            response.data = dependencias;
            response.message = "Dependencias obtenidas correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener las dependencias:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener las dependencias";
        }
        return response;
    }
    static async GetAllWChilds() {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const dependencias = await Dependencias.findAll({
                include: [{ all: true }]
            });
            response.data = dependencias;
            response.message = "Dependencias con hijos obtenidas correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al obtener las dependencias con hijos:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener las dependencias con hijos";
        }
        return response;
    };
    
    static async GetById(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const dependencia = await Dependencias.findByPk(id);
            if (dependencia) {
                response.data = dependencia;
                response.message = "Dependencia obtenida correctamente";
                response.type_of_response = TypeOfResponse.SUCCESS;
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Dependencia no encontrada";
            }
        } catch (error) {
            console.error("Error al obtener la dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al obtener la dependencia";
        }
        return response;
    }

    static async CreateDependencia(nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            // Verificar si la dependencia ya está registrada
            const existingDependencia = await Dependencias.findOne({ where: { nombre: nombre } });
            if (existingDependencia) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "La dependencia ya está registrada";
                return response;
            }
            const newDependencia = await Dependencias.create({
                nombre,
                custom_id,
                delegacion_id,
                funcionario_id,
                tipodependenciaId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            response.data = newDependencia;
            response.message = "Dependencia creada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al crear la dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al crear la dependencia";
        }
        return response;
    }

    static async updateDependencia(id, nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        console.log("Actualizando dependencia con ID:", id);
        console.log("Nuevos datos:", { nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId });        
        try {
            const dependencia = await Dependencias.findByPk(id);
            if (!dependencia) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Dependencia no encontrada";
                return response;
            }
            dependencia.nombre = nombre || dependencia.nombre;
            dependencia.custom_id = custom_id || dependencia.custom_id;
            dependencia.delegacion_id = delegacion_id || dependencia.delegacion_id;
            dependencia.funcionario_id = funcionario_id || dependencia.funcionario_id;
            dependencia.tipodependenciaId = tipodependenciaId || dependencia.tipodependenciaId;
            dependencia.updatedAt = new Date();
            await dependencia.save();
            response.data = dependencia;
            response.message = "Dependencia actualizada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al actualizar la dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al actualizar la dependencia";
        }
        return response;
    }


    static async deleteDependencia(id) {
        let response = new Response.Response();
        let TypeOfResponse = Response.TypeOfResponse;
        try {
            const dependencia = await Dependencias.findByPk(id);
            if (!dependencia) {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = "Dependencia no encontrada";
                return response;
            }
            await dependencia.destroy();
            response.message = "Dependencia eliminada correctamente";
            response.type_of_response = TypeOfResponse.SUCCESS;
        } catch (error) {
            console.error("Error al eliminar la dependencia:", error);
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = "Error al eliminar la dependencia";
        }
        return response;
    }

    static async getUtilsDep(){
      let response = new Response.Response();
      let TypeOfResponse = Response.TypeOfResponse;
      
      try{
        const Delegacion = db.Delegacion;
        const Funcionario = db.Funcionario;
        const TipoDependencia = db.TipoDependencia;

        const utils = await Promise.all([
          Delegacion.findAll(),
          Funcionario.findAll(),
          TipoDependencia.findAll()
        ]);

        response.data = {
          delegaciones: utils[0],
          funcionarios: utils[1],
          tiposDependencia: utils[2]
        };

        response.type_of_response = TypeOfResponse.SUCCESS;
        return response;
      } catch(error){
        console.error("Error al obtener datos de utilidades:", error);
        response.type = TypeOfResponse.ERROR;
        response.message = "Error interno";
        return response;
      }
    }
}

module.exports = DependenciasRepository;
