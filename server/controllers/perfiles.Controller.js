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
  try {
    const id = req.user.id;
    const { socialNetwork, startTime, endTime, duration } = req.body;
console.log(req.body);
    // Validación básica
    if (!startTime || !endTime) {
      return res.status(400).json({ message: "Faltan datos obligatorios (tiempo)." });
    }
    if (typeof socialNetwork !== 'string' || socialNetwork.trim() === '') {
      return res.status(400).json({ message: "Nombre inválido. Debe ser una cadena no vacía." });
    }

    // Conectar a la base de datos y validar los datos
    try {
      const connection = await connectDB();

      // Insertar en la base de datos
      const [result] = await connection.query(
        'INSERT INTO tiempo_uso(idUsuario, red_social, tiempo_inicio, tiempo_final, duracion) VALUES(?, ?, ?, ?, ?)',
        [id, socialNetwork, startTime, endTime, duration]
      );
      res.json({ message: "datos guardados", result });
    } catch (error) {
      console.error("Error al conectar/insertar en la base de datos:", error);
      res.status(500).json({ message: "Error interno del servidor al procesar la base de datos." });
    }
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ message: "Error interno del servidor." });
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