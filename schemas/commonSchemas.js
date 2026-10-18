import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce
    .number({ message: "El id debe ser un número entero positivo" })
    .int("El id debe ser un número entero positivo")
    .positive("El id debe ser un número entero positivo"),
});