import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { StartDB } from "./src/config/database.js";

import {authRouter} from "./src/routes/auth.route.js";
import {userRouter} from "./src/routes/user.route.js";
import {profileRouter} from "./src/routes/profile.route.js";
import {articleRouter} from "./src/routes/article.route.js";
import {tagRouter} from "./src/routes/tag.route.js";
import {articleTagRouter} from "./src/routes/articleTag.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/articles", articleRouter);
app.use("/api/tags", tagRouter);
app.use("/api/articles-tags", articleTagRouter);

app.listen(PORT, async () => {
  await StartDB();

  console.log("Servidor corriendo con exito");
});
