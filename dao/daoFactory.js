import config from "../config/config.js";
import habitacionesMemoryDao from "./habitacionesMemoryDao.js";
import reservasMemoryDao from "./reservasMemoryDao.js";
import usuariosMemoryDao from "./usuariosMemoryDao.js";

async function createDaos() {
  switch (config.persistenceType) {
    case "memory":
      return {
        habitacionDao: habitacionesMemoryDao,
        reservaDao: reservasMemoryDao,
        usuarioDao: usuariosMemoryDao,
      };

    case "sequelize": {
      // Se importa solo si se usa: en modo memoria ni se carga Sequelize
      const { sequelize } = await import("./models/index.js");
      const { default: habitacionesSequelizeDao } = await import("./habitacionesSequelizeDao.js");
      const { default: reservasSequelizeDao } = await import("./reservasSequelizeDao.js");
      const { default: usuariosSequelizeDao } = await import("./usuariosSequelizeDao.js");

      await sequelize.sync();

      return {
        habitacionDao: habitacionesSequelizeDao,
        reservaDao: reservasSequelizeDao,
        usuarioDao: usuariosSequelizeDao,
      };
    }

    default:
      throw new Error(
        `PERSISTENCE_TYPE inválido: "${config.persistenceType}". Valores posibles: memory, sequelize`
      );
  }
}

export default createDaos;