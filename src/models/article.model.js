import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define("article", {
  title: {
    type: DataTypes.STRING(200),
    validate: { len: [3, 200] },
  },
  content: {
    type: DataTypes.TEXT,
    validate: {
      len: [50, 500],
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
});

UserModel.hasMany(ArticleModel, { foreingKey: "user_id", as: "articles" });
ArticleModel.belongsTo(UserModel, { foreingKey: "user_id", as: "user" });
