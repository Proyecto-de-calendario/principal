const connectDB = require('../dataBase'); // Importa la función para conectar a la base de datos

async function obtenerTareas(req, res) {
  try { 
    const id = +req.params.id; // Verifcar que existe el id
    if (!id || isNaN(usuario)) { 
      return res.status(400).json({ message: "Invalid user ID. Please provide a valid number." });
    }

    const connection = await connectDB(); 
    const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ?', [id]);

    return res.json(results);
  } catch (error) {

    console.error(error); 
    res.status(500).json({ message: "Internal server error" }); //  error del servidor
  }
} 

async function crearTarea(req, res) {
  const id = +req.params.id;
  
  const idTarea = Math.floor(Math.random() * Math.pow(10, 9));
  const fechaCreacion = new Date();
  const { tarea , fechaFin, prioridad } = req.body;

  try {

    // 1. Basicas
    if (!tarea || !fechaFin || !prioridad) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    } 
    if (typeof tarea !== 'string' || tarea.trim() === '') {
      return res.status(400).json({ message: "Nombre de tarea inválido. Debe ser una cadena no vacía." });
    }
    if (typeof fechaFin !== 'string' || fechaFin.trim() === '') {
      return res.status(400).json({ message: "Fecha de Fin inválida. Debe ser una cadena no vacía." }); 
    }
    if (typeof prioridad !== 'number' || isNaN(prioridad)) {
      return res.status(400).json({ message: "Prioridad inválida. Debe ser un número." }); 
    }

    // 2. Validacion Database
    const connection = await connectDB(); 
    const [existingTask] = await connection.query('SELECT * FROM tareas WHERE idTarea = ?', [idTarea]);
    if (existingTask.length > 0) {
      return res.status(400).json({ message: "Ya existe una tarea con este ID" });
    }

    // 3. Insert
    const [result] = await connection.query(
      'INSERT INTO tareas(idTarea, idUsuario, nombreTarea, prioridadTarea, fechaIngresoTarea, fechaFinTarea) VALUES(?, ?, ?, ?, ?, ?)',
      [idTarea, id, tarea, prioridad, fechaCreacion, fechaFin]
    );
    res.json({ message: "Tarea creada", result });
    connection.end();

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error" }); 
  }
}

  async function borrarTarea(req, res) {
    try {
      const idTarea = req.params.idTarea; 
      if (!idTarea || isNaN(idTarea)) {
        return res.status(400).json({ message: "Tarea ID inválido. Debe ser un número." }); 
      }
  
      const id = +idTarea; 
      const connection = await connectDB(); 
  
      // DELETE
      const [results] = await connection.query('DELETE FROM tareas WHERE idTarea = ?', [id]); 
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tarea no encontrada" }); // tarea no encontrada
      } 
  
      return res.json({ message: "Tarea borrada exitosamente", results });
  
    } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Error al borrar tarea" }); // error del servidor
    }
  }
module.exports = {
  obtenerTareas,
  crearTarea,
  borrarTarea,
};