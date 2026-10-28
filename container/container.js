import { Router } from "express";

import config from "../config/config.js";
import createDaos from "../dao/daoFactory.js";
import createEventBus from "../events/eventBus.js";
import consoleNotifier from "../notifications/consoleNotifier.js";
import registerAlertListeners from "../alerts/registerAlertListeners.js";

import createPasswordHasher from "../security/passwordHasher.js";
import createTokenService from "../security/tokenService.js";
import createAuthMiddlewares from "../middlewares/auth.js";
import seedAdmin from "../usecases/auth/seedAdmin.js";
import makeAuthUseCases from "../usecases/auth/makeAuthUseCases.js";

import makeHabitacionUseCases from "../usecases/habitaciones/makeHabitacionUseCases.js";
import makeReservaUseCases from "../usecases/reservas/makeReservaUseCases.js";

import AuthController from "../controllers/AuthController.js";
import HabitacionesController from "../controllers/HabitacionesController.js";
import ReservasController from "../controllers/ReservasController.js";

import makeAuthRouter from "../routes/authRoutes.js";
import makeHabitacionesRouter from "../routes/habitacionesRoutes.js";
import makeReservasRouter from "../routes/reservasRoutes.js";

import makeDocsRouter from "../docs/docsRouter.js";

async function buildContainer() {
  // 1. Persistencia: la factory elige según PERSISTENCE_TYPE
  const { habitacionDao, reservaDao, usuarioDao } = await createDaos();

  // 2. Seguridad: hasheo de contraseñas, tokens y middlewares de acceso
  const hasher = createPasswordHasher({ rounds: config.bcryptRounds });
  const tokens = createTokenService({ secret: config.jwtSecret, expiresIn: config.jwtExpiresIn });
  const auth = createAuthMiddlewares(tokens);

  // El primer administrador se siembra al arrancar (después de que las tablas existen)
  await seedAdmin(
    { email: config.adminEmail, password: config.adminPassword },
    { usuarioDao, hasher }
  );

  // 3. Eventos: un único bus, un notificador y quién escucha
  const events = createEventBus();
  const notifier = consoleNotifier;
  registerAlertListeners(events, notifier);

  // 4. Casos de uso con sus dependencias inyectadas
  const authUseCases = makeAuthUseCases({ usuarioDao, hasher, tokens });
  const habitacionUseCases = makeHabitacionUseCases({ habitacionDao, reservaDao });
  const reservaUseCases = makeReservaUseCases({ reservaDao, habitacionDao, events });

  // 5. Controladores con los casos de uso inyectados
  const authController = new AuthController(authUseCases);
  const habitacionesController = new HabitacionesController(habitacionUseCases);
  const reservasController = new ReservasController(reservaUseCases);

  // 6. Router principal con las rutas montadas
  const router = Router();
  router.use("/api-docs", makeDocsRouter());
  router.use("/auth", makeAuthRouter(authController, auth));
  router.use("/habitaciones", makeHabitacionesRouter(habitacionesController, auth));
  router.use("/reservas", makeReservasRouter(reservasController, auth));
  return router;
}

export default buildContainer;