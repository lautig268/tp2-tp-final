async function getReservas(filters, { reservaDao }) {
  return reservaDao.getAll(filters);
}

export default getReservas;