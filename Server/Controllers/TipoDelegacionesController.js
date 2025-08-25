const TipoDependenciaRepository = require('../Repositories/Catalogs/TypeDependenciesRepository');

class TipoDelegacionesController{

     static async GetAll(req, res) {
        try {
            const response = await TipoDependenciaRepository.GetAll();  
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
            const response = await TipoDependenciaRepository.GetById(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async CreateTipoDelegacion(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios: nombre',
                });
            }
            const response = await TipoDependenciaRepository.CreateTypeDependency(nombre);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async UpdateTipoDelegacion(req, res) {
        try {
            const id = req.params.id;
            const { nombre } = req.body;
            const response = await TipoDependenciaRepository.updateTypeDependency(id, nombre);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }


    static async DeleteTipoDelegacion(req, res) {
        try {
            const id = req.params.id;
            const response = await TipoDependenciaRepository.deleteTypeDependency(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }
}

module.exports = TipoDelegacionesController;