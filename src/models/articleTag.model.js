import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { TagModel } from "./tag.model.js";
import { ArticleModel } from "./article.model.js";

export const ArticleTagModel = sequelize.define(
  "Article_Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    paranoid: true,
  },
);

ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  as: "tags",
  onDelete: "CASCADE",
});
TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  as: "articles",
  onDelete: "CASCADE",
});

ArticleTagModel.belongsTo(ArticleModel, {
  foreignKey: "article_id",
  as: "article",
});

ArticleTagModel.belongsTo(TagModel, {
  foreignKey: "tag_id",
  as: "tag",
});
