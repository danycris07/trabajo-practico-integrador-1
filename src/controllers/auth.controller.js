import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    const hashedPassword = await hashPassword(dataLimpia.password);

    const usuario = await UserModel.create({
      username: dataLimpia.username,
      email: dataLimpia.email,
      password: hashedPassword,
      role: "user",
    });

    await ProfileModel.create({
      user_id: usuario.id,
      first_name: dataLimpia.first_name,
      last_name: dataLimpia.last_name,
      biography: dataLimpia.biography,
      avatar_url: dataLimpia.avatar_url,
      birth_date: dataLimpia.birth_date,
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req);

    const usuario = await UserModel.findOne({
      where: { username },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });

    if (!usuario) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const passwordCorrecta = await comparePassword(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken({
      id: usuario.id,
      username: usuario.username,
      role: usuario.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
      path: "/",
    });

    return res.status(200).json({
      message: "Login exitoso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const usuario = await UserModel.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Perfil obtenido correctamente",
      usuario,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({
      message: "Logout exitoso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
