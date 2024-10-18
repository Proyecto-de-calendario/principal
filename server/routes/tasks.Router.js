import { Router } from 'express';
const taskRouter = Router();
import { tasks, createTask,modifyTask, deleteTasks } from '../controllers/tasks.Controller.js'; // Importa el controlador

taskRouter.get('/:id', tasks);
taskRouter.post('/', createTask);
taskRouter.put('/:id',modifyTask);
taskRouter.delete('/:idTarea', deleteTasks);

export {taskRouter};