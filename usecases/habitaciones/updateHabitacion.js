import AppError from "../../errors/AppError.js";

async function updateHabitacion(id, changes, dao) {
  const actual = await dao.getById(id);

  if (!actual) {
    throw new AppError("HABITACION_NO_ENCONTRADA", `No existe la habitación con id ${id}`, 404);
  }

  // Si cambia el número, no puede chocar con el de otra habitación
  if (changes.numero !== undefined && changes.numero !== actual.numero) {
    const duplicada = await dao.getByNumero(changes.numero);

    if (duplicada) {
      throw new AppError(
        "NUMERO_DUPLICADO",
        `Ya existe una habitación con el número ${changes.numero}`,
        409
      );
    }
  }

  return dao.update(id, changes);
}

export default updateHabitacion;