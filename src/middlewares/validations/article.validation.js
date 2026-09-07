import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";

export const createArticleValidation = [
  body("title")
    .isString()
    .withMessage("El título debe ser de tipo string")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio y no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio y no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener mínimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("El resumen debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El resumen no puede estar vacío si se envía")
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isString()
    .withMessage("El status debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El status no puede estar vacío")
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),

  body("user_id")
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      const usuario = await UserModel.findByPk(user_id);

      if (!usuario) {
        throw new Error("El usuario no existe");
      }

      return true;
    }),
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
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener mínimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("El resumen debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El resumen no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isString()
    .withMessage("El status debe ser una cadena de texto")
    .trim()
    .notEmpty()
    .withMessage("El status no puede estar vacío")
    .isIn(["published", "archived"])
    .withMessage("El status debe ser published o archived"),

  body("user_id")
    .optional()
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      const usuario = await UserModel.findByPk(user_id);

      if (!usuario) {
        throw new Error("El usuario no existe");
      }

      return true;
    }),
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
