let usuarios = [];
let nextId = 1;

// Devuelve una copia del usuario SIN el hash de la contraseña
function sinHash({ passwordHash, ...usuario }) {
  return usuario;
}

const usuariosMemoryDao = {
  async getById(id) {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? sinHash(usuario) : null;
  },

  async getByEmail(email) {
    const usuario = usuarios.find((u) => u.email === email);
    return usuario ? sinHash(usuario) : null;
  },

  // Es el ÚNICO método que devuelve el hash: existe solo para el login
  async getCredentialsByEmail(email) {
    const usuario = usuarios.find((u) => u.email === email);
    return usuario ? { ...usuario } : null;
  },

  async save(data) {
    const nuevo = { id: nextId++, ...data };
    usuarios.push(nuevo);
    return sinHash(nuevo);
  },
};

export default usuariosMemoryDao;