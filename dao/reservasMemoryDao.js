let reservas = [];
let nextId = 1;

const reservasMemoryDao = {
    async getAll(filters = {}) {
    return reservas
      .filter((r) => !filters.habitacionId || r.habitacionId === filters.habitacionId)
      .filter((r) => !filters.estado || r.estado === filters.estado)
      .filter((r) => !filters.usuarioId || r.usuarioId === filters.usuarioId)
      .map((r) => ({ ...r }));
  },

  async getById(id) {
    const reserva = reservas.find((r) => r.id === id);
    return reserva ? { ...reserva } : null;
  },

  async getByHabitacion(habitacionId) {
    return reservas
      .filter((r) => r.habitacionId === habitacionId)
      .map((r) => ({ ...r }));
  },

  async save(data) {
    const nueva = { id: nextId++, ...data };
    reservas.push(nueva);
    return { ...nueva };
  },

  async update(id, changes) {
    const idx = reservas.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    reservas[idx] = { ...reservas[idx], ...changes };
    return { ...reservas[idx] };
  },

  async delete(id) {
    const idx = reservas.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    reservas.splice(idx, 1);
    return true;
  },
};

export default reservasMemoryDao;