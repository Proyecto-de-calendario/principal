const express = require("express");
const mysql2 = require("mysql2/promise");

const app = express();

// Crear una conexión a la base de datos
const start = async () => {
    const connectarBd = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proyecto_calendario',
        database: 'auth'
    })
}

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

// Exportamos la funcion para realizar la conexion desde cualquier archivo.
module.exports = {
    connectarBd
}