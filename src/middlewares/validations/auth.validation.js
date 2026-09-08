import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username) => {
      const usuario = await UserModel.findOne({
        where: { username },
      });

      if (usuario) {
        throw new Error("El username ya existe");
      }

      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    .isLength({ max: 100 })
    .withMessage("El email no puede superar los 100 caracteres")
    .custom(async (email) => {
      const usuario = await UserModel.findOne({
        where: { email },
      });

      if (usuario) {
        throw new Error("El email ya existe");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),

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

export const loginValidation = [
  body("username").trim().notEmpty().withMessage("El username es obligatorio"),

  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
