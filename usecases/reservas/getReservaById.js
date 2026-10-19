import AppError from "../../errors/AppError.js";

async function getReservaById(id, { reservaDao }) {
  const reserva = await reservaDao.getById(id);

  if (!reserva) {
    throw new AppError("RESERVA_NO_ENCONTRADA", `No existe la reserva con id ${id}`, 404);
  }

  return reserva;
}

export default getReservaById;