import AppError from "../../errors/AppError.js";

async function deleteReserva(id, { reservaDao }) {
  const eliminada = await reservaDao.delete(id);

  if (!eliminada) {
    throw new AppError("RESERVA_NO_ENCONTRADA", `No existe la reserva con id ${id}`, 404);
  }
}

export default deleteReserva;