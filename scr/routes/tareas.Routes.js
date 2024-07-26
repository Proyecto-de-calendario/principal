const router = express.Router();
const tareasController = require('./tareasController'); // Importa el controlador

router.get('/:id', tareasController.obtenerTareas);
router.post('/:id', tareasController.crearTarea);
router.delete('/:idTarea', tareasController.borrarTarea);

module.exports = router;
