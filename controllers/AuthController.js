class AuthController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  register = async (req, res) => {
    const usuario = await this.#useCases.register(req.body);
    res.status(201).json(usuario);
  };

  login = async (req, res) => {
    const resultado = await this.#useCases.login(req.body);
    res.json(resultado);
  };

  me = async (req, res) => {
    const usuario = await this.#useCases.getProfile(req.user);
    res.json(usuario);
  };
}

export default AuthController;