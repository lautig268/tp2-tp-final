import { z } from "zod";

const email = z
  .string({ message: "El email es obligatorio" })
  .trim()
  .toLowerCase()
  .email("El email no es válido");

export const registerSchema = z.object({
  nombre: z.string({ message: "El nombre es obligatorio" }).trim().min(1, "El nombre es obligatorio"),
  email,
  password: z
    .string({ message: "La contraseña es obligatoria" })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(72, "La contraseña no puede superar los 72 caracteres"),
});

export const loginSchema = z.object({
  email,
  password: z.string({ message: "La contraseña es obligatoria" }).min(1, "La contraseña es obligatoria"),
});