const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    // Aquí deberías validar el usuario y la contraseña con tu base de datos
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  }

  static async verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}

module.exports = AuthController;
