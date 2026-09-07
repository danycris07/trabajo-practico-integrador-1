import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const obtenerTodosLosPerfiles = async (req, res) => {
  try {
    const perfiles = await ProfileModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
        },
      ],
    });

    return res.status(200).json({
      message: "Perfiles obtenidos correctamente",
      perfiles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const obtenerPerfilPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const perfil = await ProfileModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "user",
        },
      ],
    });

    return res.status(200).json({
      message: "Perfil obtenido correctamente",
      perfil,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const crearPerfil = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await ProfileModel.create(dataLimpia);

    return res.status(201).json({
      message: "Perfil creado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const actualizarPerfil = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const perfil = await ProfileModel.findByPk(id);

    await perfil.update(dataLimpia);

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const eliminarPerfil = async (req, res) => {
  try {
    const { id } = matchedData(req);

    await ProfileModel.destroy({ where: { id } });

    return res.status(200).json({
      message: "Perfil eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
