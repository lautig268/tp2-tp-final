import getReservas from "./getReservas.js";
import getReservaById from "./getReservaById.js";
import createReserva from "./createReserva.js";
import updateReserva from "./updateReserva.js";
import deleteReserva from "./deleteReserva.js";

function makeReservaUseCases(deps) {
  return {
    getReservas: (filters, actor) => getReservas(filters, actor, deps),
    getReservaById: (id, actor) => getReservaById(id, actor, deps),
    createReserva: (data, actor) => createReserva(data, actor, deps),
    updateReserva: (id, changes, actor) => updateReserva(id, changes, actor, deps),
    deleteReserva: (id, actor) => deleteReserva(id, actor, deps),
  };
}

export default makeReservaUseCases;