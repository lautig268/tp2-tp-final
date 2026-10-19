export function hayConflicto(reservas, fechaEntrada, fechaSalida) {
  return reservas.some(
    (r) =>
      r.estado === "confirmada" &&
      fechaEntrada < r.fechaSalida &&
      fechaSalida > r.fechaEntrada
  );
}