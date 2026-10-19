import AppError from "../../errors/AppError.js";

async function deleteHabitacion(id, { habitacionDao, reservaDao }) {
  const habitacion = await habitacionDao.getById(id);

  if (!habitacion) {
    throw new AppError("HABITACION_NO_ENCONTRADA", `No existe la habitación con id ${id}`, 404);
  }

  const reservas = await reservaDao.getByHabitacion(id);

  if (reservas.length > 0) {
    throw new AppError(
      "HABITACION_CON_RESERVAS",
      `No se puede eliminar la habitación ${habitacion.numero}: tiene ${reservas.length} reserva(s) asociada(s)`,
      409
    );
  }

  await habitacionDao.delete(id);
}

export default deleteHabitacion;  