import { Router } from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validation.js";

export const authRouter = Router();

authRouter.post("/register", registerValidation, validate, register);

authRouter.post("/login", loginValidation, validate, login);

authRouter.get("/profile", authMiddleware, profile);

authRouter.post("/logout", authMiddleware, logout);

