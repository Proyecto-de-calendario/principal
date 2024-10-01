import { Router } from 'express';
const userRouter = Router();
import { login, crearUsuario, eliminarUsuario, verificarUsuario, modificarUsuario } from '../controllers/usuarios.Controller.js'; // Importa el controlador
import { validarUsuario,validacionCrearUsuario,validacionModificarUsuario } from '../validaciones.js';
import { validacionesUsuario } from '../applyValidations.js';
import { validarJWT } from '../helpers/validarJWT.js';
// Rutas
userRouter.get('/',validarUsuario,validacionesUsuario,validarJWT, login);
userRouter.post('/reg',validacionCrearUsuario,validacionesUsuario, crearUsuario);
userRouter.patch('/id',validacionModificarUsuario,modificarUsuario);
userRouter.delete('/:id',validarUsuario,validacionesUsuario, eliminarUsuario);
userRouter.post('/login',validarUsuario,validacionModificarUsuario,validacionesUsuario,verificarUsuario);

export {userRouter};