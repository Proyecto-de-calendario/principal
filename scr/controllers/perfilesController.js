const connectDB = require('../dataBase'); // Importa la función para conectar a la base de datos

async function obtenerPerfil(req, res) {
  try { 
    const id = +req.params.id;  // Verifcar que existe el id
    if (!id || isNaN(id)) { 
      return res.status(400).json({ message: "ID no valido" });
    }

    const connection = await connectDB(); 
    const [results] = await connection.query('SELECT * FROM perfiles WHERE idUsuario = ?', [id]);

    return res.json(results);
  } catch (error) {

    console.error(error); 
    res.status(500).json({ message: "error del servidor" }); //  error del servidor
  }
} 
async function crearPerfil(req, res) {
  const id = +req.params.id;
  const { nombre, edad, tutor } = req.body;

  try {
    // 1. Basic Validation
    if (!nombre || !edad) {
      return res.status(400).json({ message: "Faltan datos obligatorios (nombre y edad)." });
    }
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ message: "Nombre inválido. Debe ser una cadena no vacía." });
    }
    if (typeof edad !== 'number' || edad > 99) {
      return res.status(400).json({ message: "Edad inválida. Debe ser un número de al menos 2 cifras." });
    }

    // 2. Database Validation
    let connection;
    try {
      connection = await connectDB(); // Assume connectDB() returns a database connection
      // Use id to get existing profile:
      const [existingPerfil] = await connection.query(
        'SELECT * FROM perfiles WHERE idUsuario = ?',
        [id] 
      ); 
      if (existingPerfil.length > 0) {
        return res.status(400).json({ message: "Ya existe un perfil para este usuario. ID: " + id});
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
      return res.status(500).json({ message: "Error interno del servidor al validar la base de datos." });
    }

    // 3. Insert
    try { 
      const [result] = await connection.query(
          'INSERT INTO perfiles(idUsuario, nombre, edad, tutor) VALUES(?, ?, ?, ?)',
          [id, nombre, edad, tutor]
      );
      res.json({ message: "Perfil creado", result });
    } catch (error) {
      console.error("Error inserting into database:", error);
      // Log the error and return an appropriate error response
      res.status(500).json({ message: "Error interno del servidor al crear el perfil." }); 
    } 
  } catch (error) {
    console.error("General error:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
} 


  async function eliminarPerfil(req, res) {
    try {
      const id = +req.params.id; 
      if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido. Debe ser un número." }); 
      }
  
      const connection = await connectDB(); 
  
      // DELETE
      const [results] = await connection.query('DELETE FROM perfiles WHERE idUsuario = ?', [id]); 
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Perfil no encontrado" }); // perfil no encontrado
      } 
  
      return res.json({ message: "Perfil borrado exitosamente", results });
  
    } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Error al borrar Perfil" }); // error del servidor
    }
  }

  module.exports = {
    obtenerPerfil,
    crearPerfil,
    eliminarPerfil
  };