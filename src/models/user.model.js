import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const UserModel = await sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(20),
      validate: {
        len: [3, 20],
      },
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255)
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    paranoid: true,
  },
);
