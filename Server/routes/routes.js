const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Ruta GET para obtener todos los usuarios
router.get('/users', UserController.GetAll);
// Ruta GET para obtener un usuario por ID
router.get('/users/:id', UserController.GetById);
// Ruta POST para crear un nuevo usuario
router.post('/users', UserController.createUser);


module.exports = router;