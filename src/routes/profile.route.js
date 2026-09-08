import express from "express";

import {
  obtenerTodosLosPerfiles,
  obtenerPerfilPorId,
  crearPerfil,
  actualizarPerfil,
  eliminarPerfil,
} from "../controllers/profile.controller.js";

import {
  createProfileValidation,
  updateProfileValidation,
  profileIdValidation,
} from "../middlewares/validations/profile.validation.js";

import { validate } from "../middlewares/validate.js";

export const ProfileRouter = express.Router();

ProfileRouter.get("/", obtenerTodosLosPerfiles);

ProfileRouter.get("/:id", profileIdValidation, validate, obtenerPerfilPorId);

ProfileRouter.post("/", createProfileValidation, validate, crearPerfil);

ProfileRouter.put("/:id", updateProfileValidation, validate, actualizarPerfil);

ProfileRouter.delete("/:id", profileIdValidation, validate, eliminarPerfil);

