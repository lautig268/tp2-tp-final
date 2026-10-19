import { Router } from "express";
import habitacionesMemoryDao from "../dao/habitacionesMemoryDao.js";
import makeHabitacionUseCases from "../usecases/habitaciones/makeHabitacionUseCases.js";
import HabitacionesController from "../controllers/HabitacionesController.js";
import makeHabitacionesRouter from "../routes/habitacionesRoutes.js";

function buildContainer() {
  // 1. Persistencia (por ahora, solo memoria)
  const habitacionDao = habitacionesMemoryDao;

  // 2. Casos de uso con el DAO inyectado
  const habitacionUseCases = makeHabitacionUseCases(habitacionDao);

  // 3. Controlador con los casos de uso inyectados
  const habitacionesController = new HabitacionesController(habitacionUseCases);

  // 4. Router principal con las rutas montadas
  const router = Router();
  router.use("/habitaciones", makeHabitacionesRouter(habitacionesController));

  return router;
}

export default buildContainer;