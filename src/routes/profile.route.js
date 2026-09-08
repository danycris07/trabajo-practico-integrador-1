import { Router } from "express";

import {
  obtenerTodosLosPerfiles,
  obtenerPerfilPorId,
  crearPerfil,
  actualizarPerfil,
  eliminarPerfil,
} from "../controllers/profile.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createProfileValidation,
  updateProfileValidation,
  profileIdValidation,
} from "../middlewares/validations/profile.validation.js";

export const profileRouter = Router();

profileRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  obtenerTodosLosPerfiles,
);

profileRouter.get(
  "/:id",
  authMiddleware,
  profileIdValidation,
  validate,
  obtenerPerfilPorId,
);

profileRouter.post(
  "/",
  authMiddleware,
  createProfileValidation,
  validate,
  crearPerfil,
);

profileRouter.put(
  "/:id",
  authMiddleware,
  updateProfileValidation,
  validate,
  actualizarPerfil,
);

profileRouter.delete(
  "/:id",
  authMiddleware,
  profileIdValidation,
  validate,
  eliminarPerfil,
);
