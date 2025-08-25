const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/authcontroller');
const DelegationsController = require('../Controllers/DelegationsController');
const FuncionariosController = require('../Controllers/FuncionariosController');
const FuncionDelegacionController = require('../Controllers/FuncionDelegacionController');
const DependenciasController = require('../Controllers/DependenciasController');
const tipoDependenciaController = require('../Controllers/TipoDelegacionesController');
const RolesController = require('../Controllers/userRolesController');
const loginMiddleware = require('../Middlewares/VerifyToken');

//USERS ROUTERS
router.get('/users', UserController.GetAll);
router.get('/users/:id', UserController.GetById);   
router.post('/users/Create', UserController.CreateUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);



//DELEGATIONS ROUTERS
router.get('/delegations', DelegationsController.GetAll);
router.get('/delegations/:id', DelegationsController.GetById);
router.post('/delegations', DelegationsController.CreateDelegation);
router.put('/delegations/:id', DelegationsController.UpdateDelegation);
router.delete('/delegations/:id', DelegationsController.DeleteDelegation);



//DEPENDENCIAS ROUTERS
router.get('/dependencies', DependenciasController.GetAll);
router.get('/dependencies/:id', DependenciasController.GetById);
router.post('/dependencies', DependenciasController.CreateDependencia);
router.put('/dependencies/:id', DependenciasController.UpdateDependencia);
router.delete('/dependencies/:id', DependenciasController.DeleteDependencia);

// FUNCIONARIOS ROUTERS
router.get('/funcionarios', FuncionariosController.GetAll);
router.get('/funcionarios/:id', FuncionariosController.GetById);
router.post('/funcionarios', FuncionariosController.CreateFuncionario);
router.put('/funcionarios/:id', FuncionariosController.UpdateFuncionario);
router.delete('/funcionarios/:id', FuncionariosController.DeleteFuncionario);

//AUTH ROUTERS
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

//RUTAS CATALOGOS
//FUNCION DE DELEGACION
router.get('/funciondelegacion', FuncionDelegacionController.GetAll);
router.get('/funciondelegacion/:id', FuncionDelegacionController.GetById);
router.post('/funciondelegacion', FuncionDelegacionController.CreateFuncionDelegacion);
router.put('/funciondelegacion/:id', FuncionDelegacionController.UpdateFuncionDelegacion);
router.delete('/funciondelegacion/:id', FuncionDelegacionController.DeleteFuncionDelegacion);

//TIPO DEPENDENCIA
router.get('/tipodependencia', tipoDependenciaController.GetAll);
router.get('/tipodependencia/:id', tipoDependenciaController.GetById);
router.post('/tipodependencia', tipoDependenciaController.CreateTipoDelegacion);
router.put('/tipodependencia/:id', tipoDependenciaController.UpdateTipoDelegacion);
router.delete('/tipodependencia/:id', tipoDependenciaController.DeleteTipoDelegacion);


//ROLES USUARIO
router.get('/roles', RolesController.GetAll);
router.get('/roles/:id', RolesController.GetById);
router.post('/roles', RolesController.CreateUserRole);
router.put('/roles/:id', RolesController.UpdateUserRole);
router.delete('/roles/:id', RolesController.DeleteUserRole);



module.exports = router;