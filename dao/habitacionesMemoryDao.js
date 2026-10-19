let habitaciones = [];
let nextId = 1;

const habitacionesMemoryDao = {
  async getAll(filters = {}) {
    return habitaciones
      .filter((h) => !filters.tipo || h.tipo === filters.tipo)
      .map((h) => ({ ...h }));
  },

  async getById(id) {
    const habitacion = habitaciones.find((h) => h.id === id);
    return habitacion ? { ...habitacion } : null;
  },

  async getByNumero(numero) {
    const habitacion = habitaciones.find((h) => h.numero === numero);
    return habitacion ? { ...habitacion } : null;
  },

  async save(data) {
    const nueva = { id: nextId++, ...data };
    habitaciones.push(nueva);
    return { ...nueva };
  },

  async update(id, changes) {
    const idx = habitaciones.findIndex((h) => h.id === id);
    if (idx === -1) return null;
    habitaciones[idx] = { ...habitaciones[idx], ...changes };
    return { ...habitaciones[idx] };
  },

  async delete(id) {
    const idx = habitaciones.findIndex((h) => h.id === id);
    if (idx === -1) return false;
    habitaciones.splice(idx, 1);
    return true;
  },
};

export default habitacionesMemoryDao;