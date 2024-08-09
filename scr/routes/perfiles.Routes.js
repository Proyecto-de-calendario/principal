import { Router } from 'express';
const perfilRouter = Router();
import { obtenerPerfil, crearPerfil, eliminarPerfil } from '../controllers/perfilesController.js'; // Importa el controlador

perfilRouter.get('/:id', obtenerPerfil);
perfilRouter.post('/:id', crearPerfil);
perfilRouter.delete('/:id', eliminarPerfil);

export {perfilRouter};
