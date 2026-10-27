import AppError from "../../errors/AppError.js";

async function getProfile(actor, { usuarioDao }) {
  const usuario = await usuarioDao.getById(actor.id);

  if (!usuario) {
    throw new AppError("USUARIO_NO_ENCONTRADO", "El usuario del token ya no existe", 404);
  }

  return usuario;
}

export default getProfile;