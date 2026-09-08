import { Router } from "express";
import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
} from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.use(
  authMiddleware,
  authorizeRoles("admin"),
);

userRouter.get(
  "/",
  obtenerTodosLosUsuarios,
);

userRouter.get(
  "/:id",
  userIdValidation,
  validate,
  obtenerUsuarioPorId,
);

userRouter.post(
  "/",
  createUserValidation,
  validate,
  crearUsuario,
);

userRouter.put(
  "/:id",
  updateUserValidation,
  validate,
  actualizarUsuario,
);

userRouter.delete(
  "/:id",
  userIdValidation,
  validate,
  eliminarUsuario,
);
