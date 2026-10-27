async function seedAdmin({ email, password }, { usuarioDao, hasher }) {
  if (!email || !password) {
    console.warn("[seed] Falta ADMIN_EMAIL o ADMIN_PASSWORD: no se crea el administrador inicial");
    return;
  }

  const emailNormalizado = email.trim().toLowerCase();
  const existente = await usuarioDao.getByEmail(emailNormalizado);
  if (existente) return;

  const passwordHash = await hasher.hash(password);

  await usuarioDao.save({
    nombre: "Administrador",
    email: emailNormalizado,
    passwordHash,
    rol: "admin",
  });

  console.log(`[seed] Administrador inicial creado: ${emailNormalizado}`);
}

export default seedAdmin;