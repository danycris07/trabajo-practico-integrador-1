import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar_url debe ser una URL válida"),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida"),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const perfil = await ProfileModel.findByPk(id);

      if (!perfil) {
        throw new Error("El perfil no existe");
      }

      return true;
    }),

  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar_url debe ser una URL válida"),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida"),

  body("user_id")
    .not()
    .exists()
    .withMessage("No puedes modificar el usuario del perfil"),
];

export const profileIdValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const perfil = await ProfileModel.findByPk(id);

      if (!perfil) {
        throw new Error("El perfil no existe");
      }

      return true;
    }),
];
