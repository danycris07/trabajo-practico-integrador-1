import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
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

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser user o admin"),
];

export const updateUserValidation = [
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

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username, { req }) => {
      const usuario = await UserModel.findOne({
        where: { username },
      });

      if (usuario && usuario.id != req.params.id) {
        throw new Error("El username ya existe");
      }

      return true;
    }),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    .custom(async (email, { req }) => {
      const usuario = await UserModel.findOne({
        where: { email },
      });

      if (usuario && usuario.id != req.params.id) {
        throw new Error("El email ya existe");
      }

      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser user o admin"),
];

export const userIdValidation = [
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
