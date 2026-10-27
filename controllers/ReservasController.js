class ReservasController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  list = async (req, res) => {
    const reservas = await this.#useCases.getReservas(req.query, req.user);
    res.json(reservas);
  };

  get = async (req, res) => {
    const reserva = await this.#useCases.getReservaById(req.params.id, req.user);
    res.json(reserva);
  };

  create = async (req, res) => {
    const reserva = await this.#useCases.createReserva(req.body, req.user);
    res.status(201).json(reserva);
  };

  update = async (req, res) => {
    const reserva = await this.#useCases.updateReserva(req.params.id, req.body, req.user);
    res.json(reserva);
  };

  remove = async (req, res) => {
    await this.#useCases.deleteReserva(req.params.id, req.user);
    res.status(204).send();
  };
}

export default ReservasController;