import express from "express";

import {
  obtenerTodasLasTags,
  obtenerTagPorId,
  crearTag,
  actualizarTag,
  eliminarTag,
} from "../controllers/tag.controller.js";

import {
  createTagValidation,
  updateTagValidation,
  tagIdValidation,
} from "../middlewares/validations/tag.validation.js";

import { validate } from "../middlewares/validate.js";

export const TagRouter = express.Router();

TagRouter.get("/", obtenerTodasLasTags);

TagRouter.get("/:id", tagIdValidation, validate, obtenerTagPorId);

TagRouter.post("/", createTagValidation, validate, crearTag);

TagRouter.put("/:id", updateTagValidation, validate, actualizarTag);

TagRouter.delete("/:id", tagIdValidation, validate, eliminarTag);

