import { ArticleTagModel } from "../models/articleTag.model.js";
import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const agregarTagAArticulo = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await ArticleTagModel.create(dataLimpia);

    return res.status(201).json({
      message: "Etiqueta agregada al artículo correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

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
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const eliminarTagDeArticulo = async (req, res) => {
  try {
    const { articleTagId } = matchedData(req);

    await ArticleTagModel.destroy({ where: { id: articleTagId } });

    return res.status(200).json({
      message: "Etiqueta removida del artículo correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
