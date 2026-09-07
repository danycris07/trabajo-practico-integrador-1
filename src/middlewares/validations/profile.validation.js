import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const createProfileValidation = [
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

      const perfil = await ProfileModel.findOne({
        where: { user_id },
      });

      if (perfil) {
        throw new Error("El usuario ya tiene un perfil");
      }

      return true;
    }),

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe de ser una cadena de caracteres")
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
    .isDate()
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
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("last_name")
    .optional()
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
    .isDate()
    .withMessage("La fecha de nacimiento no es válida"),
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
