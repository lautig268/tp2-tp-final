import sequelize from "../sequelize.js";
import HabitacionModel from "./HabitacionModel.js";
import ReservaModel from "./ReservaModel.js";

// Una Habitación tiene muchas Reservas
HabitacionModel.hasMany(ReservaModel, {
  foreignKey: "habitacionId",
  as: "reservas",
  onDelete: "RESTRICT",
});

// Cada Reserva pertenece a una Habitación
ReservaModel.belongsTo(HabitacionModel, {
  foreignKey: "habitacionId",
  as: "habitacion",
});

export { sequelize, HabitacionModel, ReservaModel };