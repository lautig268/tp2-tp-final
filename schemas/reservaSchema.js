import { z } from "zod";

const ESTADOS = ["confirmada", "cancelada"];

// Formato YYYY-MM-DD y que la fecha exista (rechaza "2026-02-30").
function esFechaValida(valor) {
  const fecha = new Date(valor);
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().slice(0, 10) === valor;
}

const fecha = z
  .string({ message: "La fecha es obligatoria" })
  .refine(esFechaValida, { message: "Fecha inválida, usá el formato YYYY-MM-DD" });

  export const crearReservaSchema = z
  .object({
    habitacionId: z
      .number({ message: "habitacionId debe ser un número" })
      .int("habitacionId debe ser un entero")
      .positive("habitacionId debe ser positivo"),
    huesped: z.string({ message: "El huésped es obligatorio" }).min(1, "El huésped es obligatorio"),
    emailHuesped: z.string({ message: "El email es obligatorio" }).email("El email no es válido"),
    fechaEntrada: fecha,
    fechaSalida: fecha,
  })
  .refine((d) => d.fechaSalida > d.fechaEntrada, {
    message: "La fecha de salida debe ser posterior a la de entrada",
    path: ["fechaSalida"],
  });

  // Las fechas no se editan: para cambiarlas se cancela y se crea otra reserva.
export const actualizarReservaSchema = z
  .object({
    huesped: z.string().min(1, "El huésped no puede estar vacío").optional(),
    emailHuesped: z.string().email("El email no es válido").optional(),
    estado: z.enum(ESTADOS, { message: "El estado debe ser confirmada o cancelada" }).optional(),
  })
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Enviá al menos un campo para actualizar",
  });

export const listarReservasQuerySchema = z.object({
  habitacionId: z.coerce.number().int().positive().optional(),
  usuarioId: z.coerce.number().int().positive().optional(),
  estado: z.enum(ESTADOS, { message: "El estado debe ser confirmada o cancelada" }).optional(),
});