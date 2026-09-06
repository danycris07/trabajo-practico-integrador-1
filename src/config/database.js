import  Sequelize  from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  { host: process.env.DB_HOST, dialect: "mysql" },
);

export const StartDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.log("Hubo un error al concetar la Base de Datos", error);
  }
};
