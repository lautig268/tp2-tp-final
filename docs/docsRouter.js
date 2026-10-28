import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

function makeDocsRouter() {
  const spec = parse(readFileSync(new URL("./openapi.yaml", import.meta.url), "utf8"));

  const router = Router();
  router.use("/", swaggerUi.serve, swaggerUi.setup(spec));

  return router;
}

export default makeDocsRouter;