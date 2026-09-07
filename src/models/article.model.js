import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING(200),
      validate: { len: [3, 200] },
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: [50, undefined],
      },
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      defaultValue: "published",
    },
  },
  {
    paranoid: true,
  },
);

UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles" });
ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });
