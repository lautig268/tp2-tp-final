async function getReservas(filters, actor, { reservaDao }) {
  // Un huésped solo ve las suyas: el filtro se fuerza, aunque pida otro usuarioId
  const filtrosEfectivos = actor.rol === "admin" ? filters : { ...filters, usuarioId: actor.id };

  return reservaDao.getAll(filtrosEfectivos);
}

export default getReservas;