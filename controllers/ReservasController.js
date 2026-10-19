class ReservasController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  list = async (req, res) => {
    const reservas = await this.#useCases.getReservas(req.query);
    res.json(reservas);
  };

  get = async (req, res) => {
    const reserva = await this.#useCases.getReservaById(req.params.id);
    res.json(reserva);
  };

  create = async (req, res) => {
    const reserva = await this.#useCases.createReserva(req.body);
    res.status(201).json(reserva);
  };

  update = async (req, res) => {
    const reserva = await this.#useCases.updateReserva(req.params.id, req.body);
    res.json(reserva);
  };

  remove = async (req, res) => {
    await this.#useCases.deleteReserva(req.params.id);
    res.status(204).send();
  };
}

export default ReservasController;