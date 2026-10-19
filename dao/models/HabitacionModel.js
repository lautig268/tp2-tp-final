import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

class HabitacionModel extends Model {}

HabitacionModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero: { type: DataTypes.STRING, allowNull: false, unique: true },
    tipo: { type: DataTypes.STRING, allowNull: false },
    capacidad: { type: DataTypes.INTEGER, allowNull: false },
    precioPorNoche: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Habitacion",
    tableName: "habitaciones",
    timestamps: false,
  }
);

export default HabitacionModel;