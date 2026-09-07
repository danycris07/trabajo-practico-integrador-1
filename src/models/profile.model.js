import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ProfileModel = await sequelize.define("profile", {
  first_name: {
    type: DataTypes.STRING(50),
  },
  last_name: {
    type: DataTypes.STRING(50),
  },
  avatar_url: {
    type: DataTypes.STRING(255),
  },
});

UserModel.hasOne(ProfileModel, {foreignKey: "user_id", as: "profile"})
ProfileModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"})