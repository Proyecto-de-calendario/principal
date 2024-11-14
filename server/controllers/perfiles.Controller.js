import {connectDB} from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function obtenerTiempo(req, res) {
  try { 
    const id = +req.user.id;  // Verifcar que existe el id
    if (!id || isNaN(id)) { 
      return res.status(400).json({ message: "ID no valido" });
    }

    const connection = await connectDB(); 
    const [results] = await connection.query('SELECT * FROM tiempo_uso WHERE idUsuario = ?', [id]);

    return res.json(results);
  } catch (error) {

    console.error(error); 
    res.status(500).json({ message: "error del servidor" }); //  error del servidor
  }
} 
async function tiempo (req, res) {
  const id = +req.user.id;
  const { redSocial, startTime, endTime, duration } = req.body;

  try {
    // 1. Basic Validation
    if (!startTime || !endTime) {
      return res.status(400).json({ message: "Faltan datos obligatorios (tiempo)." });
    }
    if (typeof redSocial !== 'string' || redSocial.trim() === '') {
      return res.status(400).json({ message: "Nombre inválido. Debe ser una cadena no vacía." });
    }

    // 2. Database Validation
    
    try {
      const connection = await connectDB(); // Assume connectDB() returns a database connection
      // Use id to get existing profile:
      const [session] = await connection.query(
        'SELECT * FROM tiempo_uso WHERE idUsuario = ?',
        [id] 
      ); 
    } catch (error) {
      console.error("Error connecting to database:", error);
      return res.status(500).json({ message: "Error interno del servidor al validar la base de datos." });
    }

    // 3. Insert
    try { 
      const [result] = await connection.query(
          'INSERT INTO tiempo_uso(idUsuario, red_social, tiempo_inicio, tiempo_final, duracion) VALUES(?, ?, ?, ?, ?)',
          [id, redSocial, startTime, endTime, duration]
      );
      res.json({ message: "datos guardados", result });
    } catch (error) {
      console.error("Error inserting into database:", error);
      // Log the error and return an appropriate error response
      res.status(500).json({ message: "Error interno del servidor al guardar datos." }); 
    } 
  } catch (error) {
    console.error("General error:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
} 

  async function eliminar(req, res) {
    try {
      const id = +req.params.id; 
      if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido. Debe ser un número." }); 
      }
  
      const connection = await connectDB(); 
  
      // DELETE
      const [results] = await connection.query('DELETE FROM tiempo_uso WHERE idUsuario = ?', [id]); 
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Perfil no encontrado" }); // perfil no encontrado
      } 
  
      return res.json({ message: "Perfil borrado exitosamente", results });
  
    } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Error al borrar Perfil" }); // error del servidor
    }
  }

  export {
    obtenerTiempo,
    tiempo,
    eliminar
  };