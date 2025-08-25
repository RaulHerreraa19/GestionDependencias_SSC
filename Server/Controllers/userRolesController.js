const UserRolesRepository = require('../Repositories/Catalogs/UserRolesRepository');

class UserRolesController{

    static async GetAll(req, res) {
       try {
           const response = await UserRolesRepository.GetAll();
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
           const response = await UserRolesRepository.GetById(id);
           return res.status(200).json(response);
       } catch (error) {
           console.error(error.message);
           return res.status(500).json({
               message: 'Error en la conexión al servidor',
           });
       }
   }

   static async CreateUserRole(req, res) {
       try {
           const { descripcion } = req.body;
           if (!descripcion) {
               return res.status(400).json({
                   message: 'Faltan datos obligatorios: descripcion',
               });
           }
           const response = await UserRolesRepository.CreateUserRole(descripcion);
           return res.status(201).json(response);
       } catch (error) {
           console.error(error.message);
           return res.status(500).json({
               message: 'Error en la conexión al servidor',
           });
       }
   }

    static async UpdateUserRole(req, res) {
         try {
              const id = req.params.id;
              const { descripcion } = req.body;
              const response = await UserRolesRepository.updateUserRole(id, descripcion);
              return res.status(200).json(response);
         } catch (error) {
              console.error(error.message);
              return res.status(500).json({
                message: 'Error en la conexión al servidor',
              });
         }
    }

    static async DeleteUserRole(req, res) {
        try {
            const id = req.params.id;
            const response = await UserRolesRepository.deleteUserRole(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
            });
        }
    }


}

module.exports = UserRolesController;