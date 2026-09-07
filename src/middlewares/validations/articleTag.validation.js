import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";
import { ArticleTagModel } from "../../models/articleTag.model.js";

export const createArticleTagValidation = [

  body("article_id")
    .notEmpty()
    .withMessage("El article_id es obligatorio")
    .isInt()
    .withMessage("El article_id debe ser un número entero")
    .custom(async (article_id) => {

      const articulo = await ArticleModel.findByPk(article_id);

      if (!articulo) {
        throw new Error("El artículo no existe");
      }

      return true;
    }),

  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt()
    .withMessage("El tag_id debe ser un número entero")
    .custom(async (tag_id, { req }) => {

      const tag = await TagModel.findByPk(tag_id);

      if (!tag) {
        throw new Error("La etiqueta no existe");
      }

      const relacion = await ArticleTagModel.findOne({
        where: {
          article_id: req.body.article_id,
          tag_id,
        },
      });

      if (relacion) {
        throw new Error("La etiqueta ya está asociada al artículo");
      }

      return true;
    }),
];


export const articleTagIdValidation = [

  param("articleTagId")
    .isInt()
    .withMessage("El articleTagId debe ser un número entero")
    .custom(async (articleTagId) => {

      const relacion = await ArticleTagModel.findByPk(articleTagId);

      if (!relacion) {
        throw new Error("La relación artículo-etiqueta no existe");
      }

      return true;
    }),
];