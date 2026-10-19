import AppError from "../../errors/AppError.js";
import { hayConflicto } from "./reglas.js";

async function createReserva(data, { reservaDao, habitacionDao }) {
  const habitacion = await habitacionDao.getById(data.habitacionId);

  if (!habitacion) {
    throw new AppError(
      "HABITACION_NO_ENCONTRADA",
      `No existe la habitación con id ${data.habitacionId}`,
      404
    );
  }

  const reservasDeLaHabitacion = await reservaDao.getByHabitacion(data.habitacionId);

  if (hayConflicto(reservasDeLaHabitacion, data.fechaEntrada, data.fechaSalida)) {
    throw new AppError(
      "FECHAS_OCUPADAS",
      `La habitación ${habitacion.numero} ya está reservada en esas fechas`,
      409
    );
  }

  return reservaDao.save({ ...data, estado: "confirmada" });
}

export default createReserva;