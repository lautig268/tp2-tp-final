import { Router } from "express";
import validate from "../middlewares/validate.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import {
  crearReservaSchema,
  actualizarReservaSchema,
  listarReservasQuerySchema,
} from "../schemas/reservaSchema.js";

function makeReservasRouter(controller, { authenticate }) {
  const router = Router();

  // Todas las rutas de reservas requieren un usuario autenticado
  router.use(authenticate);

  router.get("/", validate({ query: listarReservasQuerySchema }), controller.list);
  router.get("/:id", validate({ params: idParamSchema }), controller.get);
  router.post("/", validate({ body: crearReservaSchema }), controller.create);
  router.put(
    "/:id",
    validate({ params: idParamSchema, body: actualizarReservaSchema }),
    controller.update
  );
  router.delete("/:id", validate({ params: idParamSchema }), controller.remove);

  return router;
}

export default makeReservasRouter;