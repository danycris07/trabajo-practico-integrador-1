import express from "express";
import "dotenv/config"
import { StartDB } from "./src/config/database.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json())

app.listen(PORT, async () => {
  await StartDB();
  console.log("Servidor corriendo correctamente");
});
