import express from "express";

import {
  agregarTagAArticulo,
  obtenerTodasLasRelaciones,
  eliminarTagDeArticulo,
} from "../controllers/articleTag.controller.js";

import {
  createArticleTagValidation,
  articleTagIdValidation,
} from "../middlewares/validations/articleTag.validation.js";

import { validate } from "../middlewares/validate.js";

export const ArticleTagRouter = express.Router();

ArticleTagRouter.get("/", obtenerTodasLasRelaciones);

ArticleTagRouter.post(
  "/",
  createArticleTagValidation,
  validate,
  agregarTagAArticulo,
);

ArticleTagRouter.delete(
  "/:articleTagId",
  articleTagIdValidation,
  validate,
  eliminarTagDeArticulo,
);
