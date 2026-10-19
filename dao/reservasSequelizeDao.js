import { ReservaModel } from "./models/index.js";

const reservasSequelizeDao = {
  async getAll(filters = {}) {
    const where = {};
    if (filters.habitacionId) where.habitacionId = filters.habitacionId;
    if (filters.estado) where.estado = filters.estado;

    return ReservaModel.findAll({ where, order: [["id", "ASC"]], raw: true });
  },

  async getById(id) {
    return ReservaModel.findByPk(id, { raw: true });
  },

  async getByHabitacion(habitacionId) {
    return ReservaModel.findAll({
      where: { habitacionId },
      order: [["id", "ASC"]],
      raw: true,
    });
  },

  async save(data) {
    const creada = await ReservaModel.create(data);
    return creada.get({ plain: true });
  },

  async update(id, changes) {
    const reserva = await ReservaModel.findByPk(id);
    if (!reserva) return null;

    await reserva.update(changes);
    return reserva.get({ plain: true });
  },

  async delete(id) {
    const eliminadas = await ReservaModel.destroy({ where: { id } });
    return eliminadas > 0;
  },
};

export default reservasSequelizeDao;