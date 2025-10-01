const Response = require('../Utils/Response');
const DelegationsRepository = require('../Repositories/DelegationsRepository');

class DelegationsController{

    static async GetAll(req, res) {        
        try {
            const response = await DelegationsRepository.GetAll();
            console.log("Delegaciones obtenidas controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',                
            });
        }
    }

    static async GetAllWChilds(req, res) {
        try {
            const response = await DelegationsRepository.GetAllWChilds();            
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
        const response = await DelegationsRepository.GetById(id);
        console.log("Delegación obtenida controller:", response);
        return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',                
            });
        }
    }

    static async CreateDelegation(req, res) {
        try {
            const { nombre, custom_id, fun_delegacionId } = req.body;            
            if (!nombre || !custom_id || !fun_delegacionId) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios: nombre, custom_id y fun_delegacionId',
                });
            }
            const response = await DelegationsRepository.CreateDelegation(nombre, custom_id, fun_delegacionId);
            console.log("Delegación creada controller:", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async UpdateDelegation(req, res) {
        try {            
            const {id, nombre, descripcion } = req.body;
            const response = await DelegationsRepository.updateDelegation(id, nombre, descripcion);
            console.log("Delegación actualizada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async DeleteDelegation(req, res) {        
        try {
            const { id } = req.body;
            console.log("ID de delegación a eliminar:", id);
            const response = await DelegationsRepository.deleteDelegation(id);
            console.log("Delegación eliminada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

}   

module.exports = DelegationsController;