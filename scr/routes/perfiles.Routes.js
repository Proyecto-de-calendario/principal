const express = require('express');
const router = express.Router();
const perfilesController = require('../controllers/perfilesController'); // Importa el controlador

router.get('/:id', perfilesController.obtenerPerfil);
router.post('/:id', perfilesController.crearPerfil);
router.delete('/:id', perfilesController.eliminarPerfil);

module.exports = router;
