import AppError from "../../errors/AppError.js";

async function registerUser(data, { usuarioDao, hasher }) {
  const existente = await usuarioDao.getByEmail(data.email);

  if (existente) {
    throw new AppError("EMAIL_DUPLICADO", `Ya existe un usuario con el email ${data.email}`, 409);
  }

  const passwordHash = await hasher.hash(data.password);

  // El rol lo decide el sistema, nunca el cliente: un registro público siempre crea un huésped
  return usuarioDao.save({
    nombre: data.nombre,
    email: data.email,
    passwordHash,
    rol: "huesped",
  });
}

export default registerUser;