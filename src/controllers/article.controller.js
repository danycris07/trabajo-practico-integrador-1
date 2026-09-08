import { ArticleModel } from "../models/article.model.js";
import { ArticleTagModel } from "../models/articleTag.model.js";
import { TagModel } from "../models/tag.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const obtenerTodosLosArticulos = async (req, res) => {
  try {
    const articulos = await ArticleModel.findAll({
      where: {
        status: "published",
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username"],
        },
        {
          model: TagModel,
          as: "tags",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json({
      message: "Artículos obtenidos correctamente",
      articulos,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const obtenerArticuloPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const articulo = await ArticleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username"],
        },
        {
          model: TagModel,
          as: "tags",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!articulo) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (
      articulo.status === "archived" &&
      req.user &&
      articulo.user_id !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    return res.status(200).json({
      message: "Artículo obtenido correctamente",
      articulo,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const obtenerArticulosPorUsuario = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const articulos = await ArticleModel.findAll({
      where: {
        user_id: id,
        status: "published",
      },
      include: [
        {
          model: TagModel,
          as: "tags",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json({
      message: "Artículos del usuario obtenidos correctamente",
      articulos,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const crearArticulo = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await ArticleModel.create({
      ...dataLimpia,
      user_id: req.user.id,
    });

    return res.status(201).json({
      message: "Artículo creado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const actualizarArticulo = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const articulo = await ArticleModel.findByPk(id);

    if (!articulo) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (articulo.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "No tienes permisos para modificar este artículo",
      });
    }

    await articulo.update(dataLimpia);

    return res.status(200).json({
      message: "Artículo actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const eliminarArticulo = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const articulo = await ArticleModel.findByPk(id);

    if (!articulo) {
      return res.status(404).json({
        message: "Artículo no encontrado",
      });
    }

    if (articulo.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "No tienes permisos para eliminar este artículo",
      });
    }

    await ArticleTagModel.destroy({
      where: {
        article_id: id,
      },
    });

    await articulo.destroy();

    return res.status(200).json({
      message: "Artículo eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
