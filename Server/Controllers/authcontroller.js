const jwt = require('jsonwebtoken');
const UserRepository = require('../Repositories/UserRepository');
const bcrypt = require('bcrypt');
const env = require('dotenv');
env.config();


class AuthController {
  static async login(req, res) {
    const { password, email } = req.body;
    try {
      user = await UserRepository.GetByEmail(email);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          type_of_response: 'ERROR'
        });
      }
      //validate hasedpassword   
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) { 
        return res.status(401).json({
          message: 'Invalid password',
          type_of_response: 'ERROR'
        });
      }
      // Generate JWT token
      const token = jwt.sign({ id: user.Id, email: user.Email }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION 
      });

      // res.cookie('token', token, {
      //   httpOnly: true, 
      //   secure: process.env.NODE_ENV === 'development', // Use secure cookies in development
      //   sameSite: 'Strict' // Helps prevent CSRF attacks
      // });

      return res.status(200).json({
        message: 'Login exitoso',
        type_of_response: 'SUCCESS',
        token
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor',
        type_of_response: 'ERROR'
      });
    }
  }
}


module.exports = AuthController;
