import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

class ReservaModel extends Model {}

ReservaModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    habitacionId: { type: DataTypes.INTEGER, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    huesped: { type: DataTypes.STRING, allowNull: false },
    emailHuesped: { type: DataTypes.STRING, allowNull: false },
    fechaEntrada: { type: DataTypes.STRING, allowNull: false },
    fechaSalida: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Reserva",
    tableName: "reservas",
    timestamps: false,
  }
);

export default ReservaModel;