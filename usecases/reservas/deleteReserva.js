import AppError from "../../errors/AppError.js";
import { verificarDueno } from "./reglas.js";

async function deleteReserva(id, actor, { reservaDao }) {
  const reserva = await reservaDao.getById(id);

  if (!reserva) {
    throw new AppError("RESERVA_NO_ENCONTRADA", `No existe la reserva con id ${id}`, 404);
  }

  verificarDueno(reserva, actor);

  await reservaDao.delete(id);
}

export default deleteReserva;