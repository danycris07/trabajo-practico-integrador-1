import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener mínimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),
];

export const updateArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const articulo = await ArticleModel.findByPk(id);

      if (!articulo) {
        throw new Error("El artículo no existe");
      }

      return true;
    }),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener mínimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),

  body("user_id")
    .not()
    .exists()
    .withMessage("No puedes modificar el usuario del artículo"),
];

export const articleIdValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const articulo = await ArticleModel.findByPk(id);

      if (!articulo) {
        throw new Error("El artículo no existe");
      }

      return true;
    }),
];

export const userArticlesValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const usuario = await UserModel.findByPk(id);

      if (!usuario) {
        throw new Error("El usuario no existe");
      }

      return true;
    }),
];
