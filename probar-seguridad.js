import config from "./config/config.js";
import createPasswordHasher from "./security/passwordHasher.js";
import createTokenService from "./security/tokenService.js";

const hasher = createPasswordHasher({ rounds: config.bcryptRounds });
const tokens = createTokenService({ secret: config.jwtSecret, expiresIn: config.jwtExpiresIn });

const hash = await hasher.hash("Clave12345");
console.log("Hash:", hash);
console.log("Contraseña correcta:", await hasher.compare("Clave12345", hash));
console.log("Contraseña incorrecta:", await hasher.compare("otra", hash));

const token = tokens.sign({ sub: "1", rol: "admin" });
console.log("Token:", token);
console.log("Verificado:", tokens.verify(token));

try {
  tokens.verify(token + "x");
} catch (err) {
  console.log("Token alterado:", err.code);
}