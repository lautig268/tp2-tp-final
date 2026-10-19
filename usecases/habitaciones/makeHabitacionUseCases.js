import getHabitaciones from "./getHabitaciones.js";
import getHabitacionById from "./getHabitacionById.js";
import createHabitacion from "./createHabitacion.js";
import updateHabitacion from "./updateHabitacion.js";
import deleteHabitacion from "./deleteHabitacion.js";

function makeHabitacionUseCases(deps) {
  return {
    getHabitaciones: (filters) => getHabitaciones(filters, deps),
    getHabitacionById: (id) => getHabitacionById(id, deps),
    createHabitacion: (data) => createHabitacion(data, deps),
    updateHabitacion: (id, changes) => updateHabitacion(id, changes, deps),
    deleteHabitacion: (id) => deleteHabitacion(id, deps),
  };
}

export default makeHabitacionUseCases;