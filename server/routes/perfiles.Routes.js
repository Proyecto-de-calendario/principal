import { Router } from 'express';
const dataRouter = Router();
import { obtenerTiempo, tiempo, eliminar } from '../controllers/perfiles.Controller.js'; // Importa el controlador
import { validateJWT } from '../helpers/validarJWT.js';

dataRouter.get('/', validateJWT,obtenerTiempo);
dataRouter.post('/', validateJWT,tiempo);
dataRouter.delete('/:id',validateJWT, eliminar);

export {dataRouter};
