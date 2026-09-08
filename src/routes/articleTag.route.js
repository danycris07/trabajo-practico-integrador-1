import { Router } from "express";

import {
  obtenerTodasLasRelaciones,
  crearRelacion,
  actualizarRelacion,
  eliminarRelacion,
} from "../controllers/articleTag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createArticleTagValidation,
  updateArticleTagValidation,
  articleTagIdValidation,
} from "../middlewares/validations/articleTag.validation.js";

export const articleTagRouter = Router();

articleTagRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  obtenerTodasLasRelaciones,
);

articleTagRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createArticleTagValidation,
  validate,
  crearRelacion,
);

articleTagRouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateArticleTagValidation,
  validate,
  actualizarRelacion,
);

articleTagRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  articleTagIdValidation,
  validate,
  eliminarRelacion,
);

