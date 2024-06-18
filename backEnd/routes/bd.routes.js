const express = require('express');
const conectarBd = require('./backEnd/bd.js'); // Asegúrate de ajustar la ruta al archivo db.js

const app = express();

app.get('/', async (req, res) => {
    try {
        const connection = await conectarBd();
        const [rows] = await connection.execute('SELECT id from perfil_usuario');
        res.send(`Número de filas: ${rows.length}`);
    } catch (error) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

app.post('/', async (req,res) => {
    try {
        const connection = await conectarBd();
        const[rows] = await connection.execute("insert into perfil_usuario(id, email, edad) values ('nombre', 'email',edad)")
    }
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
module.exports = app;