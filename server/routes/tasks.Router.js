import { Router } from 'express';
const taskRouter = Router();
import { tasks, createTask,modifyTask, deleteTasks } from '../controllers/tasks.Controller.js'; // Importa el controlador
import { validacionObtenerTareas, validateModifyTask, validarcrearTareas } from '../authValidations.js';
import { validateJWT } from '../helpers/validarJWT.js';

taskRouter.get('/', validateJWT, validacionObtenerTareas, tasks);
taskRouter.post('/', validateJWT,validarcrearTareas, createTask);
taskRouter.put('/',validateJWT,validateModifyTask,modifyTask)
taskRouter.delete('/',validateJWT, deleteTasks);

export {taskRouter};
