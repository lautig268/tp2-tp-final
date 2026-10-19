import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.dbStorage,
  logging: false,
});

export default sequelize;