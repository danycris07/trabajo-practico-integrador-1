import express from "express";
import "dotenv/config"

import { StartDB } from "./src/config/database.js";
import { UserRouter } from "./src/routes/user.route.js";
import { ProfileRouter } from "./src/routes/profile.route.js";
import { TagRouter } from "./src/routes/tag.route.js";
import { ArticleRouter } from "./src/routes/article.route.js";
import { ArticleTagRouter } from "./src/routes/articleTag.route.js";


const PORT = process.env.PORT;
const app = express();
app.use(express.json())

app.use("/api/users", UserRouter)
app.use("/api/profiles", ProfileRouter)
app.use("/api/articles", ArticleRouter)
app.use("/api/tags", TagRouter)
app.use("/api/articles-Tags", ArticleTagRouter)

app.listen(PORT, async () => {
  await StartDB();
  console.log("Servidor corriendo correctamente");
});
