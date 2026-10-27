import { Router } from "express";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

function makeAuthRouter(controller, { authenticate }) {
  const router = Router();

  router.post("/register", validate({ body: registerSchema }), controller.register);
  router.post("/login", validate({ body: loginSchema }), controller.login);
  router.get("/me", authenticate, controller.me);

  return router;
}

export default makeAuthRouter;