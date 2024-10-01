import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  cookieParser  from 'cookie-parser';

const app = express();

app.use(cors(
    {
    origin: "http://localhost:5173",
    credentials: true,
    }
));
app.use(morgan('dev'));
app.use(json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

// Modulo de rutas - Todos los endpoints estarían aquí
import {userRouter} from './routes/usuarios.Routes.js';
import {taskRouter} from './routes/tareas.Routes.js'; 
import {perfilRouter} from './routes/perfiles.Routes.js';

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/perfiles', perfilRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));