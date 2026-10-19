const config = {
  port: Number(process.env.PORT) || 3000,
  persistenceType: process.env.PERSISTENCE_TYPE || "memory",
  dbStorage: process.env.DB_STORAGE || "./database.sqlite",
};

export default config;