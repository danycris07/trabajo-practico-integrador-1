import express from "express";

import {
  obtenerTodosLosArticulos,
  obtenerArticuloPorId,
  obtenerArticulosPorUsuario,
  crearArticulo,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/article.controller.js";


import {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
} from "../middlewares/validations/article.validation.js";

import { userIdValidation } from "../middlewares/validations/user.validation.js";

import { validate } from "../middlewares/validate.js";

export const ArticleRouter = express.Router();

ArticleRouter.get("/", obtenerTodosLosArticulos);

ArticleRouter.get(
  "/user/:id",
  userIdValidation,
  validate,
  obtenerArticulosPorUsuario,
);

ArticleRouter.get("/:id", articleIdValidation, validate, obtenerArticuloPorId);

ArticleRouter.post("/", createArticleValidation, validate, crearArticulo);

ArticleRouter.put("/:id", updateArticleValidation, validate, actualizarArticulo);

ArticleRouter.delete("/:id", articleIdValidation, validate, eliminarArticulo);
