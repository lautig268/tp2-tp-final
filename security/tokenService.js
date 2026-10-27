import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

function createTokenService({ secret, expiresIn }) {
  return {
    sign: (payload) => jwt.sign(payload, secret, { expiresIn }),

    verify(token) {
      try {
        // Fijamos el algoritmo para que nadie pueda cambiarlo desde el header del token
        return jwt.verify(token, secret, { algorithms: ["HS256"] });
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError("TOKEN_EXPIRED", "El token venció, iniciá sesión de nuevo", 401);
        }
        throw new AppError("TOKEN_INVALID", "Token inválido", 401);
      }
    },
  };
}

export default createTokenService;