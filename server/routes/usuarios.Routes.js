import { Router } from 'express';
import { login, createUser, modifyUser, removeUser, validateSession,logout } from '../controllers/usuarios.Controller.js'; // Importa el controlador
import { userValidations,validacionCrearUsuario,validacionModificarUsuario } from '../validaciones.js';
import { validacionesUsuario } from '../applyValidations.js';
import { validateJWT } from '../helpers/validarJWT.js';

const userRouter = Router();
// Rutas
userRouter.get('/session',validateJWT, validateSession);
userRouter.post('/reg',validacionCrearUsuario,validacionesUsuario, createUser);
userRouter.patch('/id',validacionModificarUsuario,modifyUser);
userRouter.delete('/:id',userValidations,validacionesUsuario, removeUser);
userRouter.post('/login',login);
userRouter.post('/logout',validateJWT,logout)

export {userRouter};