import express from "express";
import config from "./config/config.js";
import validate from "./middlewares/validate.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import { crearHabitacionSchema } from "./schemas/habitacionSchema.js";

const app = express();
app.use(express.json());

app.post("/prueba", validate({ body: crearHabitacionSchema }), (req, res) => {
  res.status(201).json(req.body);
});

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Servidor en http://localhost:${config.port}`));