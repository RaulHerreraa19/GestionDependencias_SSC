const TypeOfResponse = require('../Utils/Response');
const DependenciasRepository = require('../Repositories/DependenciasRepository');

class DependenciasController{

    static async GetAll(req, res) {        
        try {
            const response = await DependenciasRepository.GetAll();
            console.log("Dependencias obtenidas controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',                
            });
        }
    }
    static async GetById(req, res) {        
        try {
        const id = req.params.id;
        const response = await DependenciasRepository.GetById(id);
        console.log("Dependencia obtenida controller:", response);
        return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',                
            });
        }
    }    
    
    static async CreateDependencia(req, res) {
        try {
            const { nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId } = req.body;            
            if (!nombre || !custom_id || !delegacion_id || !funcionario_id || !tipodependenciaId) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios: nombre, custom_id, delegacion_id, funcionario_id y tipodependenciaId',
                });
            }
            const response = await DependenciasRepository.CreateDependencia(nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId);
            console.log("Dependencia creada controller:", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async UpdateDependencia(req, res) {
        try {
            const id = req.params.id;
            const { nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId } = req.body;
            const response = await DependenciasRepository.updateDependencia(id, nombre, custom_id, delegacion_id, funcionario_id, tipodependenciaId);
            console.log("Dependencia actualizada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async DeleteDependencia(req, res) {
        try {
            const id = req.params.id;
            const response = await DependenciasRepository.deleteDependencia(id);
            console.log("Dependencia eliminada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }
}   


module.exports = DependenciasController;