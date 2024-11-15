import { Router } from 'express';
import { login, createUser, removeUser, validateSession,logout } from '../controllers/auth.Controller.js'; // Importa el controlador
import { userValidations,validacionCrearUsuario } from '../authValidations.js';
import { validacionesUsuario } from '../applyValidations.js';
import { validateJWT } from '../helpers/validarJWT.js';

const userRouter = Router();
// Rutas
userRouter.get('/session',validateJWT, validateSession);
userRouter.post('/reg',validacionCrearUsuario,validacionesUsuario, createUser);
userRouter.delete('/:id',userValidations,validacionesUsuario, removeUser);
userRouter.post('/login',login);
userRouter.post('/logout',validateJWT,logout)

export {userRouter};