import express from "express";

import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/user.controller.js";

import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
} from "../middlewares/validations/user.validation.js";

import { validate } from "../middlewares/validate.js";

export const UserRouter = express.Router();

UserRouter.get("/", obtenerTodosLosUsuarios);

UserRouter.get("/:id", userIdValidation, validate, obtenerUsuarioPorId);

UserRouter.post("/", createUserValidation, validate, crearUsuario);

UserRouter.put("/:id", updateUserValidation, validate, actualizarUsuario);

UserRouter.delete("/:id", userIdValidation, validate, eliminarUsuario);
