import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

class UsuarioModel extends Model {}

UsuarioModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);

export default UsuarioModel;