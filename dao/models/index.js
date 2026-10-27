import sequelize from "../sequelize.js";
import HabitacionModel from "./HabitacionModel.js";
import ReservaModel from "./ReservaModel.js";
import UsuarioModel from "./UsuarioModel.js";

// Una Habitación tiene muchas Reservas
HabitacionModel.hasMany(ReservaModel, {
  foreignKey: "habitacionId",
  as: "reservas",
  onDelete: "RESTRICT",
});
ReservaModel.belongsTo(HabitacionModel, {
  foreignKey: "habitacionId",
  as: "habitacion",
});

// Un Usuario tiene muchas Reservas
UsuarioModel.hasMany(ReservaModel, {
  foreignKey: "usuarioId",
  as: "reservas",
  onDelete: "RESTRICT",
});
ReservaModel.belongsTo(UsuarioModel, {
  foreignKey: "usuarioId",
  as: "usuario",
});

export { sequelize, HabitacionModel, ReservaModel, UsuarioModel };