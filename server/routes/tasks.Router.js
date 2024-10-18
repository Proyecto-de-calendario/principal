import { Router } from 'express';
const taskRouter = Router();
import { tasks, createTask,modifyTask, deleteTasks } from '../controllers/tasks.Controller.js'; // Importa el controlador

taskRouter.get('/', obtenerTareas);
taskRouter.post('/', crearTarea);
taskRouter.delete('/', borrarTarea);

export {taskRouter};