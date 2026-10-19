import AppError from "../../errors/AppError.js";

async function deleteHabitacion(id, dao) {
  const eliminada = await dao.delete(id);

  if (!eliminada) {
    throw new AppError("HABITACION_NO_ENCONTRADA", `No existe la habitación con id ${id}`, 404);
  }
}

export default deleteHabitacion;