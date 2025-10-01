const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const AuthController = require("../Controllers/authcontroller");
const DelegationsController = require("../Controllers/DelegationsController");
const FuncionariosController = require("../Controllers/FuncionariosController");
const FuncionDelegacionController = require("../Controllers/FuncionDelegacionController");
const DependenciasController = require("../Controllers/DependenciasController");
const tipoDependenciaController = require("../Controllers/TipoDelegacionesController");
const RolesController = require("../Controllers/userRolesController");
const verifyToken = require("../Middlewares/VerifyToken");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
//USERS ROUTERS
router.get("/users", verifyToken, UserController.GetAll);
router.get("/users/:id", verifyToken, UserController.GetById);
router.post("/users/create", verifyToken, UserController.CreateUser);
router.post("/users/update", verifyToken, UserController.updateUser);
router.post("/users/delete", verifyToken, UserController.deleteUser);

//DELEGATIONS ROUTERS
router.get("/delegations", DelegationsController.GetAll);
router.get("/delegationsAll", DelegationsController.GetAllWChilds);
router.get("/delegations/:id", verifyToken, DelegationsController.GetById);
router.post("/delegations/create", DelegationsController.CreateDelegation);
router.post(
  "/delegations/update",
  verifyToken,
  DelegationsController.UpdateDelegation
);
router.post("/delegations/delete", DelegationsController.DeleteDelegation);

//DEPENDENCIAS ROUTERS
router.get("/dependencies", verifyToken, DependenciasController.GetAll);
router.get("/dependenciesAll", DependenciasController.GetAllWChilds);
router.get("/dependencies/:id", verifyToken, DependenciasController.GetById);
router.post(
  "/dependencies/create",
  verifyToken,
  DependenciasController.CreateDependencia
);
router.post(
  "/dependencies/update",
  verifyToken,
  DependenciasController.UpdateDependencia
);
router.post(
  "/dependencies/delete",
  verifyToken,
  DependenciasController.DeleteDependencia
);

// FUNCIONARIOS ROUTERS
router.get("/funcionarios", verifyToken, FuncionariosController.GetAll);
router.get("/funcionarios/:id", verifyToken, FuncionariosController.GetById);
router.post(
  "/funcionarios/create",
  verifyToken,
  FuncionariosController.CreateFuncionario
);
router.post(
  "/funcionarios/update",
  verifyToken,
  FuncionariosController.UpdateFuncionario
);
router.post(
  "/funcionarios/delete",
  verifyToken,
  FuncionariosController.DeleteFuncionario
);

//AUTH ROUTERS
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

//RUTAS CATALOGOS
//FUNCION DE DELEGACION
router.get(
  "/funciondelegacion",
  verifyToken,
  FuncionDelegacionController.GetAll
);
router.get(
  "/funciondelegacion/:id",
  verifyToken,
  FuncionDelegacionController.GetById
);
router.post(
  "/funciondelegacion/create",
  verifyToken,
  FuncionDelegacionController.CreateFuncionDelegacion
);
router.post(
  "/funciondelegacion/update",
  verifyToken,
  FuncionDelegacionController.UpdateFuncionDelegacion
);
router.post(
  "/funciondelegacion/delete",
  FuncionDelegacionController.DeleteFuncionDelegacion
);

//TIPO DEPENDENCIA
router.get("/tipodependencia", verifyToken, tipoDependenciaController.GetAll);
router.get(
  "/tipodependencia/:id",
  verifyToken,
  tipoDependenciaController.GetById
);
router.post(
  "/tipodependencia/create",
  verifyToken,
  tipoDependenciaController.CreateTipoDelegacion
);
router.post(
  "/tipodependencia/update",
  verifyToken,
  tipoDependenciaController.UpdateTipoDelegacion
);
router.post(
  "/tipodependencia/delete",
  verifyToken,
  tipoDependenciaController.DeleteTipoDelegacion
);

//ROLES USUARIO
router.get("/roles", verifyToken, RolesController.GetAll);
router.get("/roles/:id", verifyToken, RolesController.GetById);
router.post("/roles/create", verifyToken, RolesController.CreateUserRole);
router.post("/roles/update", verifyToken, RolesController.UpdateUserRole);
router.post("/roles/delete", verifyToken, RolesController.DeleteUserRole);

module.exports = router;
