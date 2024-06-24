const { register, login } = require('../controllers/auth.controller');

//requerimos el metodo router de express y lo inicializamos.
const router = require('express').Router();

// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post('/register', register);

// Lo mismo que el registro pero con el login.
router.post('/login', login);

// Exportamos las rutas
module.exports = router;