import getReservas from "./getReservas.js";
import getReservaById from "./getReservaById.js";
import createReserva from "./createReserva.js";
import updateReserva from "./updateReserva.js";
import deleteReserva from "./deleteReserva.js";

function makeReservaUseCases(deps) {
  return {
    getReservas: (filters) => getReservas(filters, deps),
    getReservaById: (id) => getReservaById(id, deps),
    createReserva: (data) => createReserva(data, deps),
    updateReserva: (id, changes) => updateReserva(id, changes, deps),
    deleteReserva: (id) => deleteReserva(id, deps),
  };
}

export default makeReservaUseCases;