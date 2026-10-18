import AppError from "../errors/AppError.js";

function notFound(req, res, next) {
  next(new AppError("RUTA_NO_ENCONTRADA", `No existe la ruta ${req.method} ${req.originalUrl}`, 404));
}

export default notFound;