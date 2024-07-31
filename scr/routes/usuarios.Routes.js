const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarios.Controller'); // Importa el controlador

// Rutas
router.get('/:id', usersController.obtenerUsuario);
router.post('/reg', usersController.crearUsuario);
router.delete('/:id', usersController.eliminarUsuario);
router.post('/login', usersController.verificarUsuario);

module.exports = router;