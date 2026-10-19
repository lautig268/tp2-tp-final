class HabitacionesController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  list = async (req, res) => {
    const habitaciones = await this.#useCases.getHabitaciones(req.query);
    res.json(habitaciones);
  };

  get = async (req, res) => {
    const habitacion = await this.#useCases.getHabitacionById(req.params.id);
    res.json(habitacion);
  };

  create = async (req, res) => {
    const habitacion = await this.#useCases.createHabitacion(req.body);
    res.status(201).json(habitacion);
  };

  update = async (req, res) => {
    const habitacion = await this.#useCases.updateHabitacion(req.params.id, req.body);
    res.json(habitacion);
  };

  remove = async (req, res) => {
    await this.#useCases.deleteHabitacion(req.params.id);
    res.status(204).send();
  };
}

export default HabitacionesController;