async function getHabitaciones(filters, { habitacionDao }) {
  return habitacionDao.getAll(filters);
}

export default getHabitaciones;