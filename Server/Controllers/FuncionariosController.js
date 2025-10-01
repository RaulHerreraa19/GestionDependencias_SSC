const Response = require('../Utils/Response');
const FuncionariosRepository = require('../Repositories/FuncionarosRepository');


class FuncionariosController {

    static async GetAll(req, res) {
        try {
            const response = await FuncionariosRepository.GetAll();
            console.log("Funcionarios obtenidos controller:", response);
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
            const response = await FuncionariosRepository.GetById(id);
            console.log("Funcionario obtenido controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async CreateFuncionario(req, res) {
        try {
            const { nombre, apellido, correo, telefono, cargo } = req.body;
            if (!nombre || !apellido || !correo || !telefono || !cargo) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios: nombre, apellido, correo, telefono y cargo',
                });
            }
            let data = { nombre, apellido, correo, telefono, cargo };
            const response = await FuncionariosRepository.CreateFuncionario(data);
            console.log("Funcionario creado controller:", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async UpdateFuncionario(req, res) {
        try {
            const { id, nombre, apellido, email, telefono } = req.body;
            const response = await FuncionariosRepository.updateFuncionario(id, { nombre, apellido, email, telefono });
            console.log("Funcionario actualizado controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }

    static async DeleteFuncionario(req, res) {
        try {
            const {id} = req.body;
            const response = await FuncionariosRepository.deleteFuncionario(id);
            console.log("Funcionario eliminado controller:", response);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }


}

module.exports = FuncionariosController;