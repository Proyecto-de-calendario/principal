import { Router } from 'express';
const userRouter = Router();
import { obtenerUsuario, crearUsuario, eliminarUsuario, verificarUsuario, modificarUsuario } from '../controllers/usuarios.Controller.js'; // Importa el controlador
import { validarUsuario,validacionCrearUsuario,validacionModificarUsuario } from '../validaciones.js';
import { validacionesUsuario } from '../applyValidations.js';
// Rutas
userRouter.get('/:id',validarUsuario,validacionesUsuario, obtenerUsuario);
userRouter.post('/reg',validacionCrearUsuario,validacionesUsuario, crearUsuario);
userRouter.patch('/id',validacionModificarUsuario,modificarUsuario);
userRouter.delete('/:id',validarUsuario,validacionesUsuario, eliminarUsuario);
userRouter.post('/login',validarUsuario,validacionModificarUsuario,validacionesUsuario,verificarUsuario);

export {userRouter};