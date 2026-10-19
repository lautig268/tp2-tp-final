import AppError from "../../errors/AppError.js";

async function createHabitacion(data, { habitacionDao }) {
  const existente = await habitacionDao.getByNumero(data.numero);

  if (existente) {
    throw new AppError(
      "NUMERO_DUPLICADO",
      `Ya existe una habitación con el número ${data.numero}`,
      409
    );
  }

  return habitacionDao.save(data);
}

export default createHabitacion;