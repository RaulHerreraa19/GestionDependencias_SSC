const jwt = require("jsonwebtoken");
const UserRepository = require("../Repositories/UserRepository");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const { response } = require("express");
const { TypeOfResponse } = require("../Utils/Response");
const session = require("express-session");
env.config();

class AuthController {
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resUser = await UserRepository.GetByEmail(correo);
      let response = resUser.data.dataValues;
      if (response === null || response === undefined) {
        return res.status(404).json({
          message: "Usuario no Encontrado",
          type_of_response: "ERROR",
        });
      }

      const passCompare = response.password;
      const user = {
        id: response.id,
        email: response.email,
        roleId: response.roleId,
      };
      const isPasswordValid = await bcrypt.compare(contraseña, passCompare);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Contraseña incorrecta",
          type_of_response: "ERROR",
        });
      }
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

      session.token = token;
      return res.status(200).json({
        message: "Login exitoso",
        type_of_response: "SUCCESS",
        token: token,
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Por Favor revisa bien los datos",
        error: error,
        type_of_response: "ERROR",
      });
    }
  }

  static async register(req, res) {
    const { nombre, apellido, correo, telefono, password, roleId } = req.body;
    const user = {
      nombre,
      apellido,
      correo,
      telefono,
      contraseña: password,
      roleId,
    };
    try {
      const valMail = await UserRepository.GetByEmail(correo);

      if (valMail.message == "Usuario encontrado") {
        return res.status(409).json({
          valido: false,
          mensaje: "Correo en Uso",
        });
      }
      const response = await UserRepository.CreateUser(user);
      if (response.type_of_response === TypeOfResponse.SUCCESS) {
        return res.status(201).json(response);
      } else {
        return res.status(400).json({
          message: response.message,
          type_of_response: TypeOfResponse.ERROR,
        });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Error en la conexión al servidor",
        type_of_response: TypeOfResponse.ERROR,
      });
    }
  }
}

module.exports = AuthController;
