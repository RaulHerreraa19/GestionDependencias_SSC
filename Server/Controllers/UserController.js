const UserRepository = require('../Repositories/UserRepository');
const TypeOfResponse = require('../Utils/Response');
const UserModel = require('../Models/user');


class UserController{

  static async GetAll(req, res) {        
    try {
      const response = await UserRepository.GetAll();
      console.log("Usuarios obtenidos controller:", response);
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
        const response = await UserRepository.GetById(id);
        console.log("Usuario obtenido controller:", response);
        return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',                
            });
        }
    }

    static async CreateUser(req, res) {
        try {
            const { nombre, apellido, email, telefono, password, roleId } = req.body;
            const response = await UserRepository.CreateUser(nombre, apellido, email, telefono, password, roleId);
            console.log("Usuario creado controller:", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }


    static async updateUser(req, res) {
        try {
          
            const { id, nombre, apellido, email, telefono, roleId } = req.body;

            const user = await UserRepository.updateUser(id, nombre, apellido, email, telefono, roleId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json({ message: 'Usuario actualizado correctamente', user });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Error en la conexión al servidor' });
        }
    }

    static async deleteUser(req, res) {
        try {            
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID de usuario es obligatorio' });
            }            
            const deleted = await UserRepository.deleteUser(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Error en la conexión al servidor' });
        }
    }

}


module.exports = UserController;