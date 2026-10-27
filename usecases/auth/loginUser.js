import AppError from "../../errors/AppError.js";

async function loginUser({ email, password }, { usuarioDao, hasher, tokens }) {
  const credenciales = await usuarioDao.getCredentialsByEmail(email);
  const valido = credenciales && (await hasher.compare(password, credenciales.passwordHash));

  if (!valido) {
    throw new AppError("INVALID_CREDENTIALS", "Email o contraseña incorrectos", 401);
  }

  const token = tokens.sign({ sub: String(credenciales.id), rol: credenciales.rol });

  return {
    token,
    user: {
      id: credenciales.id,
      nombre: credenciales.nombre,
      email: credenciales.email,
      rol: credenciales.rol,
    },
  };
}

export default loginUser;