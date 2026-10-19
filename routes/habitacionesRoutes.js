import { Router } from "express";
import validate from "../middlewares/validate.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import {
  crearHabitacionSchema,
  actualizarHabitacionSchema,
  listarHabitacionesQuerySchema,
} from "../schemas/habitacionSchema.js";

function makeHabitacionesRouter(controller) {
  const router = Router();

  router.get("/", validate({ query: listarHabitacionesQuerySchema }), controller.list);
  router.get("/:id", validate({ params: idParamSchema }), controller.get);
  router.post("/", validate({ body: crearHabitacionSchema }), controller.create);
  router.put(
    "/:id",
    validate({ params: idParamSchema, body: actualizarHabitacionSchema }),
    controller.update
  );
  router.delete("/:id", validate({ params: idParamSchema }), controller.remove);

  return router;
}

export default makeHabitacionesRouter;