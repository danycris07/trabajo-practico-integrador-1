import { Router } from "express";

import {
  obtenerTodasLasTags,
  obtenerTagPorId,
  crearTag,
  actualizarTag,
  eliminarTag,
} from "../controllers/tag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createTagValidation,
  updateTagValidation,
  tagIdValidation,
} from "../middlewares/validations/tag.validation.js";

export const tagRouter = Router();

tagRouter.get("/", obtenerTodasLasTags);

tagRouter.get("/:id", tagIdValidation, validate, obtenerTagPorId);

tagRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createTagValidation,
  validate,
  crearTag,
);

tagRouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateTagValidation,
  validate,
  actualizarTag,
);

tagRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  tagIdValidation,
  validate,
  eliminarTag,
);
