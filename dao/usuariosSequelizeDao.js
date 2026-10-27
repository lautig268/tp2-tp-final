import { UsuarioModel } from "./models/index.js";

// Las lecturas piden SOLO estas columnas: passwordHash no está incluida
const USER_ATTRIBUTES = ["id", "nombre", "email", "rol"];

const usuariosSequelizeDao = {
  async getById(id) {
    return UsuarioModel.findByPk(id, { attributes: USER_ATTRIBUTES, raw: true });
  },

  async getByEmail(email) {
    return UsuarioModel.findOne({ where: { email }, attributes: USER_ATTRIBUTES, raw: true });
  },

  // Es el ÚNICO método que devuelve el hash: existe solo para el login
  async getCredentialsByEmail(email) {
    return UsuarioModel.findOne({
      where: { email },
      attributes: [...USER_ATTRIBUTES, "passwordHash"],
      raw: true,
    });
  },

  async save(data) {
    const creado = await UsuarioModel.create(data);
    const { passwordHash, ...usuario } = creado.get({ plain: true });
    return usuario;
  },
};

export default usuariosSequelizeDao;