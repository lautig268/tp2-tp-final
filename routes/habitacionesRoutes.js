import { Router } from "express";
import validate from "../middlewares/validate.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import {
  crearHabitacionSchema,
  actualizarHabitacionSchema,
  listarHabitacionesQuerySchema,
} from "../schemas/habitacionSchema.js";

function makeHabitacionesRouter(controller, { authenticate, authorize }) {
  const router = Router();

  // Públicas
  router.get("/", validate({ query: listarHabitacionesQuerySchema }), controller.list);
  router.get("/:id", validate({ params: idParamSchema }), controller.get);

  // Solo admin
  router.post(
    "/",
    authenticate,
    authorize("admin"),
    validate({ body: crearHabitacionSchema }),
    controller.create
  );
  router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    validate({ params: idParamSchema, body: actualizarHabitacionSchema }),
    controller.update
  );
  router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    validate({ params: idParamSchema }),
    controller.remove
  );

  return router;
}

export default makeHabitacionesRouter;