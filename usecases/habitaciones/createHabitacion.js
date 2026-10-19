import AppError from "../../errors/AppError.js";

async function createHabitacion(data, dao) {
  const existente = await dao.getByNumero(data.numero);

  if (existente) {
    throw new AppError(
      "NUMERO_DUPLICADO",
      `Ya existe una habitación con el número ${data.numero}`,
      409
    );
  }

  return dao.save(data);
}

export default createHabitacion;