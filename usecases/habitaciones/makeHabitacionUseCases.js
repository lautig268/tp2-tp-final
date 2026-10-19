import getHabitaciones from "./getHabitaciones.js";
import getHabitacionById from "./getHabitacionById.js";
import createHabitacion from "./createHabitacion.js";
import updateHabitacion from "./updateHabitacion.js";
import deleteHabitacion from "./deleteHabitacion.js";

function makeHabitacionUseCases(dao) {
  return {
    getHabitaciones: (filters) => getHabitaciones(filters, dao),
    getHabitacionById: (id) => getHabitacionById(id, dao),
    createHabitacion: (data) => createHabitacion(data, dao),
    updateHabitacion: (id, changes) => updateHabitacion(id, changes, dao),
    deleteHabitacion: (id) => deleteHabitacion(id, dao),
  };
}

export default makeHabitacionUseCases;