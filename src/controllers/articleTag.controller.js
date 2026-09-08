import { ArticleTagModel } from "../models/articleTag.model.js";
import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const obtenerTodasLasRelaciones = async (req, res) => {
  try {
    const relaciones = await ArticleTagModel.findAll({
      include: [
        {
          model: ArticleModel,
          as: "article",
        },
        {
          model: TagModel,
          as: "tag",
        },
      ],
    });

    return res.status(200).json({
      message: "Relaciones obtenidas correctamente",
      relaciones,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const crearRelacion = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await ArticleTagModel.create(dataLimpia);

    return res.status(201).json({
      message: "Tag asociada al artículo correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const actualizarRelacion = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const relacion = await ArticleTagModel.findByPk(id);

    if (!relacion) {
      return res.status(404).json({
        message: "Relación no encontrada",
      });
    }

    await relacion.update(dataLimpia);

    return res.status(200).json({
      message: "Relación actualizada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const eliminarRelacion = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const relacion = await ArticleTagModel.findByPk(id);

    if (!relacion) {
      return res.status(404).json({
        message: "Relación no encontrada",
      });
    }

    await relacion.destroy();

    return res.status(200).json({
      message: "Relación eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
