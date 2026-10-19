import AppError from "../../errors/AppError.js";

async function getHabitacionById(id, dao) {
  const habitacion = await dao.getById(id);

  if (!habitacion) {
    throw new AppError("HABITACION_NO_ENCONTRADA", `No existe la habitación con id ${id}`, 404);
  }

  return habitacion;
}

export default getHabitacionById;