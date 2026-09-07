import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const TagModel = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      validate: {
        len: [2, 30],
      },
    },
  },
  {
    paranoid: true,
  },
);
