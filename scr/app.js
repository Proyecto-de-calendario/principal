const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Modulo de rutas - Todos los endpoints estarían aquí
const userRouter = require('./routes/usuarios.Routes');
const taskRouter = require('./routes/tareas.Routes'); 
const perfilRouter = require('./routes/perfiles.Routes');

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/perfiles', perfilRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));