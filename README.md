# Hotel API

API REST para gestionar las habitaciones y reservas de un hotel pequeño.
Trabajo Práctico Integrador: arquitectura en capas con inversión de dependencias,
persistencia intercambiable y eventos.

## Dominio y entidades

**Habitación**: `id`, `numero` (único), `tipo` (`simple`, `doble`, `suite`), `capacidad`, `precioPorNoche`.

**Reserva**: `id`, `habitacionId`, `huesped`, `emailHuesped`, `fechaEntrada`, `fechaSalida`, `estado` (`confirmada` o `cancelada`).

## Relación entre entidades

Una Habitación tiene muchas Reservas (1 a N). Cada Reserva pertenece a una sola Habitación.

```
Habitación 1 ────── N Reserva
```

Regla de negocio: no se puede crear una reserva si sus fechas se superponen con otra reserva confirmada de la misma habitación (error 409).

## Instalación y ejecución

_(a completar)_

## Cambiar de persistencia

_(a completar)_

## Documentación de la API

_(a completar: Swagger en `/api-docs`)_

## Eventos

_(a completar: evento `reserva.confirmada` y su listener)_