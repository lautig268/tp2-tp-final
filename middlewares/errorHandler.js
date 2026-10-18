import AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next) {
  // 1. Error esperado: lo lanzamos nosotros con AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    });
  }

  // 2. JSON mal formado en el body (lo detecta express.json())
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: { code: "JSON_INVALIDO", message: "El cuerpo de la petición no es un JSON válido" },
    });
  }

  // 3. Error inesperado (un bug): lo registramos y devolvemos un 500 genérico
  console.error("Error no controlado:", err);
  res.status(500).json({
    error: { code: "ERROR_INTERNO", message: "Ocurrió un error inesperado" },
  });
}

export default errorHandler;