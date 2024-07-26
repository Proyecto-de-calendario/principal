const express = require('express');
const connectDB = require('./dataBase'); 

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

// Modulo de rutas - Todos los endpoints estarían aquí
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks'); 

app.use('/usuarios', userRouter);
app.use('/tareas', taskRouter);


app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));