import { Router } from 'express';
const userRouter = Router();
import { login, createUser, modifyUser, removeUser, validateSession } from '../controllers/usuarios.Controller.js'; // Importa el controlador
import { userValidations,validacionCrearUsuario,validacionModificarUsuario } from '../validaciones.js';
import { validacionesUsuario } from '../applyValidations.js';
import { validarJWT } from '../helpers/validarJWT.js';

// Rutas
userRouter.get('/session',validarJWT, validateSession);
userRouter.post('/reg',validacionCrearUsuario,validacionesUsuario, createUser);
userRouter.patch('/id',validacionModificarUsuario,modifyUser);
userRouter.delete('/:id',userValidations,validacionesUsuario, removeUser);
userRouter.post('/login',login);

export {userRouter};