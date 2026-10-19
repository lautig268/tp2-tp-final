import { HabitacionModel } from "./models/index.js";

const habitacionesSequelizeDao = {
  async getAll(filters = {}) {
    const where = {};
    if (filters.tipo) where.tipo = filters.tipo;

    return HabitacionModel.findAll({ where, order: [["id", "ASC"]], raw: true });
  },

  async getById(id) {
    return HabitacionModel.findByPk(id, { raw: true });
  },

  async getByNumero(numero) {
    return HabitacionModel.findOne({ where: { numero }, raw: true });
  },

  async save(data) {
    const creada = await HabitacionModel.create(data);
    return creada.get({ plain: true });
  },

  async update(id, changes) {
    const habitacion = await HabitacionModel.findByPk(id);
    if (!habitacion) return null;

    await habitacion.update(changes);
    return habitacion.get({ plain: true });
  },

  async delete(id) {
    const eliminadas = await HabitacionModel.destroy({ where: { id } });
    return eliminadas > 0;
  },
};

export default habitacionesSequelizeDao;