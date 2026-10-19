import { Router } from "express";

import createDaos from "../dao/daoFactory.js";
import createEventBus from "../events/eventBus.js";
import consoleNotifier from "../notifications/consoleNotifier.js";
import registerAlertListeners from "../alerts/registerAlertListeners.js";

import makeHabitacionUseCases from "../usecases/habitaciones/makeHabitacionUseCases.js";
import makeReservaUseCases from "../usecases/reservas/makeReservaUseCases.js";

import HabitacionesController from "../controllers/HabitacionesController.js";
import ReservasController from "../controllers/ReservasController.js";

import makeHabitacionesRouter from "../routes/habitacionesRoutes.js";
import makeReservasRouter from "../routes/reservasRoutes.js";

async function buildContainer() {
  // 1. Persistencia: la factory elige según PERSISTENCE_TYPE
  const { habitacionDao, reservaDao } = await createDaos();

  // 2. Eventos: un único bus, un notificador y quién escucha
  const events = createEventBus();
  const notifier = consoleNotifier;
  registerAlertListeners(events, notifier);

  // 3. Casos de uso con sus dependencias inyectadas
  const habitacionUseCases = makeHabitacionUseCases({ habitacionDao, reservaDao });
  const reservaUseCases = makeReservaUseCases({ reservaDao, habitacionDao, events });

  // 4. Controladores con los casos de uso inyectados
  const habitacionesController = new HabitacionesController(habitacionUseCases);
  const reservasController = new ReservasController(reservaUseCases);

  // 5. Router principal con las rutas montadas
  const router = Router();
  router.use("/habitaciones", makeHabitacionesRouter(habitacionesController));
  router.use("/reservas", makeReservasRouter(reservasController));

  return router;
}

export default buildContainer;