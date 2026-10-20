# Hotel API

API REST para gestionar las habitaciones y reservas de un hotel pequeño.
Trabajo Práctico Integrador: arquitectura en capas con inversión de dependencias,
persistencia intercambiable y eventos.

## Dominio y entidades

**Habitación**: `id`, `numero` (único), `tipo` (`simple`, `doble`, `suite`), `capacidad`, `precioPorNoche`.

**Reserva**: `id`, `habitacionId`, `huesped`, `emailHuesped`, `fechaEntrada`, `fechaSalida`, `estado` (`confirmada` o `cancelada`).

Las fechas se manejan como texto `YYYY-MM-DD`.

## Relación entre entidades

Una Habitación tiene muchas Reservas (1 a N). Cada Reserva pertenece a una sola Habitación.

```
Habitación 1 ────── N Reserva
```

### Reglas de negocio

- No se puede crear una reserva si sus fechas se superponen con otra reserva **confirmada** de la misma habitación (409). El check-out de una reserva y el check-in de otra el mismo día no cuentan como superposición.
- No se puede reactivar una reserva cancelada si otra ocupó sus fechas (409).
- No se puede repetir el número de una habitación (409).
- No se puede eliminar una habitación que tiene reservas, canceladas incluidas (409).
- Las fechas de una reserva no se editan: se cancela y se crea otra.

## Arquitectura

Flujo de una petición: `ruta → validación (Zod) → controlador → caso de uso → DAO`.

| Carpeta | Responsabilidad |
|---|---|
| `routes/` | URLs y validación de cada ruta |
| `controllers/` | Traducen HTTP a casos de uso |
| `usecases/` | Reglas de negocio |
| `dao/` | Acceso a datos (memoria y Sequelize) y la factory que los elige |
| `schemas/` | Validación con Zod |
| `middlewares/` | `validate`, `notFound` y `errorHandler` |
| `errors/` | `AppError` |
| `events/`, `notifications/`, `alerts/` | Bus de eventos, notificador y listener |
| `config/` | Configuración leída del entorno |
| `container/` | Arma todas las dependencias y devuelve el router principal |

## Instalación y ejecución

Requiere **Node.js 20.6 o superior**.

```bash
git clone https://github.com/lautig268/tp2-tp-final.git
cd tp2-tp-final
npm install
cp .env.example .env
npm run dev
```

Para ejecutar sin reinicio automático: `npm start`.

### Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `PERSISTENCE_TYPE` | `memory` o `sequelize` | `memory` |
| `DB_STORAGE` | Ruta del archivo SQLite (solo modo `sequelize`) | `./database.sqlite` |

## Cambiar de persistencia

La API tiene dos adaptadores por entidad, con la misma interfaz:

- **`memory`**: guarda en arrays de JavaScript. Los datos se pierden al reiniciar.
- **`sequelize`**: guarda en una base SQLite con Sequelize. Las tablas se crean solas al arrancar.

Para cambiar, editá `PERSISTENCE_TYPE` en el `.env` y **reiniciá el servidor**. No hay que modificar código.

## Documentación de la API

_(a completar: Swagger en `/api-docs`)_

## Eventos

**Evento:** `reserva.confirmada`, emitido por el caso de uso `createReserva` después de guardar la reserva. No se emite si la creación falla.

**Datos que envía:** `reservaId`, `habitacionNumero`, `huesped`, `fechaEntrada` y `fechaSalida`.

**Listener:** `alerts/registerAlertListeners.js` escucha el evento y le pide a un notificador que entregue un mensaje. El notificador actual (`notifications/consoleNotifier.js`) imprime en la consola. Para otro canal alcanza con escribir otro notificador con el mismo método `notify({ subject, body })` y elegirlo en el contenedor.

**Errores:** el listener captura sus propios errores. Si la notificación falla, la reserva igual se crea.