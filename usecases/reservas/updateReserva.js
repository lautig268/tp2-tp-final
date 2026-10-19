import AppError from "../../errors/AppError.js";
import { hayConflicto } from "./reglas.js";

async function updateReserva(id, changes, { reservaDao }) {
  const actual = await reservaDao.getById(id);

  if (!actual) {
    throw new AppError("RESERVA_NO_ENCONTRADA", `No existe la reserva con id ${id}`, 404);
  }

  // Si una reserva cancelada vuelve a confirmarse, esas fechas pudieron ocuparse mientras tanto
  if (changes.estado === "confirmada" && actual.estado === "cancelada") {
    const reservasDeLaHabitacion = await reservaDao.getByHabitacion(actual.habitacionId);

    if (hayConflicto(reservasDeLaHabitacion, actual.fechaEntrada, actual.fechaSalida)) {
      throw new AppError(
        "FECHAS_OCUPADAS",
        "No se puede reactivar la reserva: otra reserva ocupó esas fechas",
        409
      );
    }
  }

  return reservaDao.update(id, changes);
}

export default updateReserva;