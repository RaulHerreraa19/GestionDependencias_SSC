const jwt = require('jsonwebtoken');
const UserRepository = require('../Repositories/UserRepository');
const bcrypt = require('bcrypt');
const env = require('dotenv');
const { response } = require('express');
env.config();


class AuthController {
  static async login(req, res) {
    const { Password, Email } = req.body;
    console.log("Email", Email);
    console.log("Password", Password);
    try {
      const response = await UserRepository.GetByEmail(Email);
      console.log("usercontroller", response);
      
      // if(response.type_of_response === 'ERROR') {
      //   return res.status(404).json({
      //     message: 'Usuario no encontrado',
      //     type_of_response: 'ERROR'
      //   });
      // }      
      let user = response.data;      
      // Check if the user exists
      // Check if the password matches
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Contraseña incorrecta',
          type_of_response: 'ERROR'
        });
      }            
      const token = jwt.sign(
        { id: user.Id, email: user.Email, roleId: user.RoleId }, // Payload
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );
             

      console.log("token", token);
       user.token = token; 

      // res.cookie('token', token, {
      //   httpOnly: true, 
      //   secure: process.env.NODE_ENV === 'development', // Use secure cookies in development
      //   sameSite: 'Strict' // Helps prevent CSRF attacks
      // });

      return res.status(200).json({
        message: 'Login exitoso',
        type_of_response: 'SUCCESS',
        token: token,
        user: user
      });
    } catch (error) {
      return res.status(500).json({

        message: 'Error interno del servidor',

        type_of_response: 'ERROR'
      });
    }
  }

  static async register(req, res) {
        const user = req.body;
        try {
            const response = await UserRepository.createUser(user);
    
            if (response.type_of_response === TypeOfResponse.SUCCESS) {
                return res.status(201).json(response);
            } else {
                return res.status(400).json({
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




module.exports = AuthController;
