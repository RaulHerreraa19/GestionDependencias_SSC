const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/authcontroller');
const loginMiddleware = require('../Middlewares/VerifyToken');

//USERS ROUTERS
router.get('/users', UserController.GetAll);
router.get('/users/:id', UserController.GetById);
router.post('/users/create', UserController.createUser);
//router.put('/users/:id', UserController.updateUser);
//router.delete('/users/:id', UserController.deleteUser);

// //DEPENDENCIES ROUTERS
// router.get('/dependencies', UserController.GetAllDependencies);
// router.get('/dependencies/:id', UserController.GetDependencyById);
// router.post('/dependencies', UserController.createDependency);
// router.put('/dependencies/:id', UserController.updateDependency);
// router.delete('/dependencies/:id', UserController.deleteDependency);

// //ROLES ROUTERS
// router.get('/roles', UserController.GetAllRoles);
// router.get('/roles/:id', UserController.GetRoleById);
// router.post('/roles', UserController.createRole);
// router.put('/roles/:id', UserController.updateRole);
// router.delete('/roles/:id', UserController.deleteRole);
// //AUTH ROUTERS
router.post('/auth/login', AuthController.login);




module.exports = router;