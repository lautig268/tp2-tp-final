async function getHabitaciones(filters, dao) {
  return dao.getAll(filters);
}

export default getHabitaciones;