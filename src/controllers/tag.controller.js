import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";

export const obtenerTodasLasTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();

    return res.status(200).json({
      message: "Tags obtenidas correctamente",
      tags,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const obtenerTagPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const tag = await TagModel.findByPk(id, {
      include: [
        {
          model: ArticleModel,
          as: "articles",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!tag) {
      return res.status(404).json({
        message: "Tag no encontrada",
      });
    }

    return res.status(200).json({
      message: "Tag obtenida correctamente",
      tag,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const crearTag = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await TagModel.create(dataLimpia);

    return res.status(201).json({
      message: "Tag creada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const actualizarTag = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        message: "Tag no encontrada",
      });
    }

    await tag.update(dataLimpia);

    return res.status(200).json({
      message: "Tag actualizada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const eliminarTag = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        message: "Tag no encontrada",
      });
    }

    await tag.destroy();

    return res.status(200).json({
      message: "Tag eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
