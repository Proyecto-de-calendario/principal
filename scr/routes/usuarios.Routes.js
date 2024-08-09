import { Router } from 'express';
const userRouter = Router();
import { obtenerUsuario, crearUsuario, eliminarUsuario, verificarUsuario } from '../controllers/usuarios.Controller.js'; // Importa el controlador

// Rutas
userRouter.get('/:id', obtenerUsuario);
userRouter.post('/reg', crearUsuario);
userRouter.delete('/:id', eliminarUsuario);
userRouter.post('/login', verificarUsuario);

export {userRouter};