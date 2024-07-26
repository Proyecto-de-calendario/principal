const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarios.Controller'); // Importa el controlador

// Rutas
router.get('/:id', usersController.obtenerUsuario);
router.post('/', usersController.crearUsuario);
router.delete('/:id', usersController.eliminarUsuario);

module.exports = router;