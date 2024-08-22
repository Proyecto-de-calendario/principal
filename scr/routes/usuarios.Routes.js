import { Router } from 'express';
const userRouter = Router();
import { obtenerUsuario, crearUsuario, eliminarUsuario, verificarUsuario, modificarUsuario } from '../controllers/usuarios.Controller.js'; // Importa el controlador
import { validacionUsuario,validacionCrearUsuario,validacionModificarUsuario } from '../validaciones.js';
import { validacionesDeTask } from '../applyValidations.js';
// Rutas
userRouter.get('/:id',validacionUsuario, obtenerUsuario);
userRouter.post('/reg',validacionCrearUsuario,validacionesDeTask, crearUsuario);
userRouter.patch('/id',validacionModificarUsuario,modificarUsuario);
userRouter.delete('/:id',validacionUsuario, eliminarUsuario);
userRouter.post('/login', verificarUsuario);

export {userRouter};