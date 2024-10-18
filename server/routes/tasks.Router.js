import { Router } from 'express';
const taskRouter = Router();
import { obtenerTareas, crearTarea, borrarTarea } from '../controllers/tareas.Controller.js'; // Importa el controlador

taskRouter.get('/', obtenerTareas);
taskRouter.post('/', crearTarea);
taskRouter.delete('/', borrarTarea);

export {taskRouter};
