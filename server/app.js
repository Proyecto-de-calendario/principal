import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  cookieParser  from 'cookie-parser';
import session from'express-session';

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
app.use(session({
    secret: 'session_secret_key', // Cambia esto por una clave secreta en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usar 'true' si usas HTTPS
}));
const PORT = process.env.PORT || 3000;

// Modulo de rutas - Todos los endpoints estarían aquí
import {userRouter} from './routes/auth.Router.js';
import {taskRouter} from './routes/tasks.Router.js'; 
import {perfilRouter} from './routes/perfiles.Routes.js';

app.use('/auth', userRouter);
app.use('/tasks', taskRouter);
app.use('/perfiles', perfilRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));