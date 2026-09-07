import express from "express";
import "dotenv/config"
import { StartDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { ArticleModel } from "./src/models/article.model.js";


const PORT = process.env.PORT;
const app = express();
app.use(express.json())

app.listen(PORT, async () => {
  await StartDB();
  console.log("Servidor corriendo correctamente");
});
