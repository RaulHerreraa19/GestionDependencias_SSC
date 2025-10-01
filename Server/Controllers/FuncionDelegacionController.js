
const FuncionDelegacionRepository = require('../Repositories/Catalogs/TypeDelegationsRepository');

class FuncionDelegacionController{
    static async GetAll(req, res) {
        try {
            const response = await FuncionDelegacionRepository.GetAll();
            console.log("Funciones de delegación obtenidas controller:", response);
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
            const response = await FuncionDelegacionRepository.GetById(id);
            console.log("Función de delegación obtenida controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }
    static async CreateFuncionDelegacion(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios: nombre y descripcion',
                });
            }
            const response = await FuncionDelegacionRepository.CreateTypeDelegation(nombre);
            console.log("Función de delegación creada controller:", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }
    static async UpdateFuncionDelegacion(req, res) {
        try {            
            const { id, nombre } = req.body;
            const response = await FuncionDelegacionRepository.updateTypeDelegation(id, nombre);
            console.log("Función de delegación actualizada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }
    static async DeleteFuncionDelegacion(req, res) {
        try {
            const { id } = req.body;
            const response = await FuncionDelegacionRepository.deleteTypeDelegation(id);
            console.log("Función de delegación eliminada controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

}

module.exports = FuncionDelegacionController;