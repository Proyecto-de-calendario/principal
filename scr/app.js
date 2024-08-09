import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());

const PORT = process.env.PORT || 3000;

// Modulo de rutas - Todos los endpoints estarían aquí
import {userRouter} from './routes/usuarios.Routes.js';
import {taskRouter} from './routes/tareas.Routes.js'; 
import {perfilRouter} from './routes/perfiles.Routes.js';

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/perfiles', perfilRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));