const express = require("express");
const mysql2 = require("mysql2/promise");
const {actualizar} = require("./perfil.js");

const app = express();

// Crear una conexión a la base de datos
const start = async () => {
    const connection = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'proyecto_calendario'
    });
    return connection;
}
// Crear una ruta para obtener datos de la base de datos

app.post("/", async (req,res) => {
    const connection = await start();
    const {nuevoNombre, nuevoEmail, nuevaedad} = req.body
    const [rows] = await connection.execute("insert into usuarios(idUsuario, nombreUsuario, contraseñaUsuario) values (?,?,?)", [nuevoNombre,nuevoEmail,nuevaedad]);
    connection.end
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
