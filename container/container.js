import { Router } from "express";

import habitacionesMemoryDao from "../dao/habitacionesMemoryDao.js";
import reservasMemoryDao from "../dao/reservasMemoryDao.js";

import makeHabitacionUseCases from "../usecases/habitaciones/makeHabitacionUseCases.js";
import makeReservaUseCases from "../usecases/reservas/makeReservaUseCases.js";

import HabitacionesController from "../controllers/HabitacionesController.js";
import ReservasController from "../controllers/ReservasController.js";

import makeHabitacionesRouter from "../routes/habitacionesRoutes.js";
import makeReservasRouter from "../routes/reservasRoutes.js";

function buildContainer() {
  // 1. Persistencia (por ahora, solo memoria)
  const habitacionDao = habitacionesMemoryDao;
  const reservaDao = reservasMemoryDao;

  // 2. Casos de uso con sus dependencias inyectadas
  const habitacionUseCases = makeHabitacionUseCases(habitacionDao);
  const reservaUseCases = makeReservaUseCases({ reservaDao, habitacionDao });

  // 3. Controladores con los casos de uso inyectados
  const habitacionesController = new HabitacionesController(habitacionUseCases);
  const reservasController = new ReservasController(reservaUseCases);

  // 4. Router principal con las rutas montadas
  const router = Router();
  router.use("/habitaciones", makeHabitacionesRouter(habitacionesController));
  router.use("/reservas", makeReservasRouter(reservasController));

  return router;
}

export default buildContainer;