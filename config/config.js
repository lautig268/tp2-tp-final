const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error(
    "Falta JWT_SECRET en el .env, o es demasiado corto (mínimo 32 caracteres). " +
      "Generá uno con: node -e \"console.log(require('node:crypto').randomBytes(48).toString('hex'))\""
  );
}

const config = {
  port: Number(process.env.PORT) || 3000,
  persistenceType: process.env.PERSISTENCE_TYPE || "memory",
  dbStorage: process.env.DB_STORAGE || "./database.sqlite",
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
};

export default config;