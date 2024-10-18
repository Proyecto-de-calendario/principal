import { Router } from 'express';
const taskRouter = Router();
import { tasks, createTask,modifyTask, deleteTasks } from '../controllers/tasks.Controller.js'; // Importa el controlador
import { validacionObtenerTareas, validateModifyTask, validarcrearTareas } from '../authValidations.js';

taskRouter.get('/', validacionObtenerTareas, tasks);
taskRouter.post('/', validarcrearTareas, createTask);
taskRouter.put('/',validateModifyTask,modifyTask)
taskRouter.delete('/', deleteTasks);

export {taskRouter};
