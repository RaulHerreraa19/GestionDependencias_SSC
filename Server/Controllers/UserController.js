const UserRepository = require('../Repositories/UserRepository');
const TypeOfResponse = require('../Utils/Response');


class UserController{

  static async GetAll(req, res) {        
    try {
        const response = await UserRepository.GetAll();
        console.log("dsps de metodo getllcontroller", response);
        if (response.type_of_response === TypeOfResponse.SUCCESS) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json({
                message: response.message,
                type_of_response: TypeOfResponse.ERROR
            });
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error en la conexión al servidor',
            type_of_response: TypeOfResponse.ERROR
        });
    }
}
    static async GetById(req, res) {
        const id = req.params.id;
        try {
            const response = await UserRepository.GetById(id);
            if (response.type_of_response === TypeOfResponse.SUCCESS) {
                return res.status(200).json(response);
            } else {
                return res.status(404).json({
                    message: response.message,
                    type_of_response: TypeOfResponse.ERROR
                });
            }

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
                type_of_response: TypeOfResponse.ERROR
            });
        }
    }            
}


module.exports = UserController;