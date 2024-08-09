import { Router } from 'express';
const taskRouter = Router();
import { obtenerTareas, crearTarea, borrarTarea } from '../controllers/tareas.Controller.js'; // Importa el controlador

taskRouter.get('/:id', obtenerTareas);
taskRouter.post('/:id', crearTarea);
taskRouter.delete('/:idTarea', borrarTarea);

export {taskRouter};
