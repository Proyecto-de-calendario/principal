import { Router } from 'express';
const dataRouter = Router();
import { obtenerTiempo, tiempo, eliminar } from '../controllers/perfiles.Controller.js'; // Importa el controlador

dataRouter.get('/', obtenerTiempo);
dataRouter.post('/', tiempo);
dataRouter.delete('/:id', eliminar);

export {dataRouter};
