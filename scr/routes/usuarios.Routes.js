const router = express.Router();
const usersController = require('../controllers/users.Controller'); // Importa el controlador

// Rutas
router.get('/:id', usersController.obtenerUsuario);
router.post('/', usersController.crearUsuario);
router.delete('/:id', usersController.borrarUsuario);

module.exports = router;