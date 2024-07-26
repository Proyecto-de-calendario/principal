const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareas.Controller'); // Importa el controlador

router.get('/:id', tareasController.obtenerTareas);
router.post('/:id', tareasController.crearTarea);
router.delete('/:idTarea', tareasController.borrarTarea);

module.exports = router;
