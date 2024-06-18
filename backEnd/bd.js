const mysql = require('mysql2/promise');

// Crear una conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Contraseña de tu base de datos
    database: 'proyecto_calendario', // Nombre de la base de datos
};

async function conectarBd() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexión exitosa a la base de datos');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw error;
    }
}

// Exportamos la funcion para realizar la conexion desde cualquier archivo.
module.exports = conectarBd;