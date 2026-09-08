import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .not()
    .contains(" ")
    .withMessage("El nombre no puede contener espacios")
    .custom(async (name) => {
      const tag = await TagModel.findOne({
        where: { name },
      });

      if (tag) {
        throw new Error("La tag ya existe");
      }

      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);

      if (!tag) {
        throw new Error("La tag no existe");
      }

      return true;
    }),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .not()
    .contains(" ")
    .withMessage("El nombre no puede contener espacios")
    .custom(async (name, { req }) => {
      const tag = await TagModel.findOne({
        where: { name },
      });

      if (tag && tag.id != req.params.id) {
        throw new Error("La tag ya existe");
      }

      return true;
    }),
];

export const tagIdValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);

      if (!tag) {
        throw new Error("La tag no existe");
      }

      return true;
    }),
];
