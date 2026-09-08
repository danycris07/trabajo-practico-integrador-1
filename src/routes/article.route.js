import { Router } from "express";

import {
  obtenerTodosLosArticulos,
  obtenerArticuloPorId,
  obtenerArticulosPorUsuario,
  crearArticulo,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/article.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

import {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
  userArticlesValidation,
} from "../middlewares/validations/article.validation.js";

export const articleRouter = Router();

articleRouter.get("/", obtenerTodosLosArticulos);

articleRouter.get(
  "/user/:id",
  userArticlesValidation,
  validate,
  obtenerArticulosPorUsuario,
);

articleRouter.get("/:id", articleIdValidation, validate, obtenerArticuloPorId);

articleRouter.post(
  "/",
  authMiddleware,
  createArticleValidation,
  validate,
  crearArticulo,
);

articleRouter.put(
  "/:id",
  authMiddleware,
  updateArticleValidation,
  validate,
  actualizarArticulo,
);

articleRouter.delete(
  "/:id",
  authMiddleware,
  articleIdValidation,
  validate,
  eliminarArticulo,
);
