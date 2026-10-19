import EVENTS from "../events/eventNames.js";

function registerAlertListeners(bus, notifier) {
  bus.on(
    EVENTS.RESERVA_CONFIRMADA,
    async ({ reservaId, habitacionNumero, huesped, fechaEntrada, fechaSalida }) => {
      try {
        await notifier.notify({
          subject: "Reserva confirmada",
          body: `Reserva #${reservaId}: ${huesped} en la habitación ${habitacionNumero}, del ${fechaEntrada} al ${fechaSalida}`,
        });
      } catch (err) {
        // Un fallo en la notificación NO debe afectar a la operación que emitió el evento
        console.error("[alertas] No se pudo notificar:", err.message);
      }
    }
  );
}

export default registerAlertListeners;