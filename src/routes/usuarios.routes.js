const { obtenerUsuario, crearUsuario } = require('../controllers/usuarios.controller');

const router = require('express').Router();

router.get('/usuarios/:id', obtenerUsuario);

router.post('/usuarios/', crearUsuario);

module.exports = router;