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
| `JWT_SECRET` | Secreto para firmar tokens (mínimo 32 caracteres). Obligatorio | — |
| `JWT_EXPIRES_IN` | Duración del token | `1h` |
| `BCRYPT_ROUNDS` | Costo del hash de contraseñas | `10` |
| `ADMIN_EMAIL` | Email del administrador inicial | — |
| `ADMIN_PASSWORD` | Contraseña del administrador inicial | — |

Para generar un `JWT_SECRET`: `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`

## Cambiar de persistencia

La API tiene dos adaptadores por entidad, con la misma interfaz:

- **`memory`**: guarda en arrays de JavaScript. Los datos se pierden al reiniciar.
- **`sequelize`**: guarda en una base SQLite con Sequelize. Las tablas se crean solas al arrancar.

Para cambiar, editá `PERSISTENCE_TYPE` en el `.env` y **reiniciá el servidor**. No hay que modificar código.

## Documentación de la API

Swagger UI está en **`/api-docs`** (por ejemplo, `http://localhost:3000/api-docs`). Documenta todos los endpoints con parámetros, ejemplos y respuestas (200, 201, 204, 400, 401, 403, 404 y 409), y permite probarlos con "Try it out".

La documentación está en `docs/openapi.yaml`. Si se modifica, hay que reiniciar el servidor.

Para probar rutas protegidas: ejecutá `POST /auth/login`, copiá el `token`, tocá **Authorize** y pegalo (sin escribir "Bearer").

## Autenticación y permisos

Las contraseñas se guardan con hash (bcrypt) y la sesión usa tokens JWT en el header `Authorization: Bearer <token>`. Al arrancar se crea un administrador con `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

| Recurso | Quién puede |
|---|---|
| `POST /auth/register`, `POST /auth/login` | Cualquiera. El registro siempre crea un `huesped` |
| `GET /habitaciones` y `GET /habitaciones/:id` | Cualquiera |
| Crear, editar y eliminar habitaciones | Solo `admin` |
| `/reservas` | Usuarios autenticados |

Cada reserva pertenece a quien la creó: un huésped solo ve y modifica las suyas (si intenta otra, recibe 403). El admin accede a todas.

## Eventos

**Evento:** `reserva.confirmada`, emitido por el caso de uso `createReserva` después de guardar la reserva. No se emite si la creación falla.

**Datos que envía:** `reservaId`, `habitacionNumero`, `huesped`, `fechaEntrada` y `fechaSalida`.

**Listener:** `alerts/registerAlertListeners.js` escucha el evento y le pide a un notificador que entregue un mensaje. El notificador actual (`notifications/consoleNotifier.js`) imprime en la consola. Para otro canal alcanza con escribir otro notificador con el mismo método `notify({ subject, body })` y elegirlo en el contenedor.

**Errores:** el listener captura sus propios errores. Si la notificación falla, la reserva igual se crea.