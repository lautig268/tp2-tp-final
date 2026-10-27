import AppError from "../../errors/AppError.js";

export function hayConflicto(reservas, fechaEntrada, fechaSalida) {
  return reservas.some(
    (r) =>
      r.estado === "confirmada" &&
      fechaEntrada < r.fechaSalida &&
      fechaSalida > r.fechaEntrada
  );
}

// Un huésped solo accede a sus propias reservas; el admin accede a todas
export function verificarDueno(reserva, actor) {
  if (actor.rol !== "admin" && reserva.usuarioId !== actor.id) {
    throw new AppError("FORBIDDEN", "No tenés permiso para acceder a esta reserva", 403);
  }
}