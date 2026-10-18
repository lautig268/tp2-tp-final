import AppError from "../errors/AppError.js";

function validate(schemas) {
  return (req, res, next) => {
    const details = [];

    for (const origen of ["params", "query", "body"]) {
      const schema = schemas[origen];
      if (!schema) continue;

      const resultado = schema.safeParse(req[origen]);

      if (!resultado.success) {
        details.push(
          ...resultado.error.issues.map((issue) => ({
            origen,
            campo: issue.path.join(".") || "(raíz)",
            mensaje: issue.message,
          }))
        );
        continue;
      }

      if (origen === "query") {
        Object.defineProperty(req, "query", {
          value: resultado.data,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      } else {
        req[origen] = resultado.data;
      }
    }

    if (details.length > 0) {
      return next(new AppError("VALIDACION", "Datos inválidos", 400, details));
    }
    next();
  };
}

export default validate;