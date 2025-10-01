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
      req.session.token = token;
      req.session.user = user;
      console.log("Sesión iniciada para el usuario:", req.session.user);
      console.log("Token de sesión:", req.session.token);
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

  static async loginFederado(req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).send("Usuario no autenticado");
      }

      // Crear JWT con solo la info necesaria
      const payload = {
        id: user.id || user.nameID, // depende de cómo venga de SAML
        email: user.email,
        nombre: user.displayName || user.cn,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Guardar sesión si quieres mantenerla server-side
      req.session.token = token;
      req.session.user = payload;

      console.log(
        "Sesión iniciada para el usuario federado:",
        req.session.user
      );
      console.log("Token de sesión:", req.session.token);

      // REDIRECCIONAR al frontend con el token
      res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    } catch (err) {
      console.error("Error en login federado:", err);
      res.status(500).send("Error en autenticación federada");
    }
  }

  static async register(req, res) {
    const { nombre, apellido, correo, telefono, contraseña, roleId } = req.body;
    const user = {
      nombre,
      apellido,
      correo,
      telefono,
      contraseña,
      roleId,
    };
    try {
      const valMail = await UserRepository.GetByEmail(correo);

      if (valMail.TypeOfResponse === TypeOfResponse.SUCCESS) {
        return res.status(409).json({
          valido: false,
          mensaje: "Correo en Uso",
        });
      }
      console.log("creando usuario: ", user);
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
  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Error al cerrar sesión",
          type_of_response: "ERROR",
        });
      }
      return res.status(200).json({
        message: "Sesión cerrada exitosamente",
        type_of_response: "SUCCESS",
      });
    });
  }
}

module.exports = AuthController;
