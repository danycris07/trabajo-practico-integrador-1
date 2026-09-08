import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll({
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

    return res.status(200).json({
      mensaje: "Usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const usuario = await UserModel.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
        {
          model: ArticleModel,
          as: "articles",
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Usuario obtenido correctamente",
      usuario,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    const hashedPassword = await hashPassword(dataLimpia.password);

    await UserModel.create({
      ...dataLimpia,
      password: hashedPassword,
    });

    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const usuario = await UserModel.findByPk(id);

    if (dataLimpia.password) {
      dataLimpia.password = await hashPassword(dataLimpia.password);
    }

    await usuario.update(dataLimpia);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = matchedData(req);

    await UserModel.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
