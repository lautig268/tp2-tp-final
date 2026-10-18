import { z } from "zod";

const TIPOS = ["simple", "doble", "suite"];

export const crearHabitacionSchema = z.object({
  numero: z.string({ message: "El número es obligatorio" }).min(1, "El número es obligatorio"),
  tipo: z.enum(TIPOS, { message: "El tipo debe ser simple, doble o suite" }),
  capacidad: z
    .number({ message: "La capacidad debe ser un número" })
    .int("La capacidad debe ser un entero")
    .min(1, "La capacidad mínima es 1"),
  precioPorNoche: z
    .number({ message: "El precio debe ser un número" })
    .positive("El precio debe ser mayor a 0"),
});

export const actualizarHabitacionSchema = crearHabitacionSchema
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Enviá al menos un campo para actualizar",
  });

export const listarHabitacionesQuerySchema = z.object({
  tipo: z.enum(TIPOS, { message: "El tipo debe ser simple, doble o suite" }).optional(),
});