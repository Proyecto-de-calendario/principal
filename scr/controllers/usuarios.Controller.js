const connectDB  = require('../dataBase'); // Importa la función para conectar a la base de datos

async function obtenerUsuario(req, res) {
    try {
        const id = +req.params.id;

        // 1. validacion de ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a valid number.' });
        }

        const connection = await connectDB(); 

        // 2. Query Database
        const [results] = await connection.query('SELECT email FROM usuarios WHERE idUsuario = ?', [id]);

        // 3. resultado vacio
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // 4. resultado parcial
        return res.json([results[0].email]); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
async function crearUsuario(req, res) {
    try {
      const { nombre,email, contrasenia } = req.body;
  
      // 1. validacion de email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico inválido.' });
      }
  
      // 2. Contraseña
      if (!contrasenia || contrasenia.length < 8) {
        return res.status(400).json({ error: 'Contraseña debe ser al menos 8 caracteres.' });
      }
  
      const connection = await connectDB(); 
      const id = Math.floor(Math.random() * Math.pow(10, 9)); 
  
      // 3. Insert Query
      const [result] = await connection.query('INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)', [id, nombre, email, contrasenia]); 
  
      res.json({ message: "Usuario creado", result });
      connection.end(); // cerrar conexion
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' }); 
    }
  }

  async function eliminarUsuario(req, res) {
    try {
      const id = +req.params.id;
  
      if (!id || isNaN(id)) { 
        return res.status(400).json({ error: 'ID inválido.' });
      }
        // delete query
      const connection = await connectDB();
      const [results] = await connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [id]);
  
      // usuario no encontrado
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' }); 
      }
      
      res.json({ message: "Usuario eliminado", results }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al borrar.' }); 
    }
  }
  
  module.exports = {
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario
  };