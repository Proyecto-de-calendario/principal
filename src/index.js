//Requerimos las dependencias.
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Inicializamos express.
const app = express();

//Aplicamos los middlewares.
app.use(cors()); // cors para que nos permita realizar peticiones desde cualquier cliente.
app.use(morgan('dev')); // morgan para mostrar informacion acerca de las peticiones que llegan a nuestro servidor.
app.use(express.json()); // express.json para que nuestro servidor pueda reconocer los json que recibimos por el body.

//Requerimos nuestras rutas.
app.use(require('../routes/auth.routes'));
app.use(require('../routes/tareas.routes'));
app.use(require('../routes/usuarios.routes'));

//Configuramos el puerto al que escuchara nuestro servidor.
app.listen(3000, () => { 
    console.log('Servidor corriendo en el puerto 3000');
})