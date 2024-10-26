import { connectDB } from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function tasks(req, res) {
  const id = +req.user.id;
  
  try {
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ?', [id]);
    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // error del servidor
  }
}



 async function createTask(req, res) {
  const id = req.user.id;
  const { name, priority, startTime, endTime, date } = req.body;

  try {
    const connection = await connectDB();

    // Insertar nueva tarea
    const [result] = await connection.query(
      'INSERT INTO tareas(idUsuario, nombre, prioridad, fechaInicio, fechaFin, dia) VALUES(?, ?, ?, ?, ?, ?)',
      [id, name, priority, startTime, endTime, date]
    );

    // Devolver resultado
    res.json({ message: "Tarea creada", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function modifyTask(req, res) {
  const id = req.user.id;
  const idTarea = +req.params.idTarea;
  const { name, priority, startTime, endTime, date } = req.body;
  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      'UPDATE tareas SET nombre = ?, prioridad = ?, horaInicio = ?, horaFin = ?, dia = ? WHERE idTarea = ?',
      [id, idTarea, name, priority, startTime, endTime, date]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" }); // tarea no encontrada
    }
    return res.json({ message: "Tarea actualizada exitosamente", results });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar tarea" }); // error del servidor
  }
}

async function deleteTasks(req, res) {
  const id = req.user.id
  const idTarea = +req.params.id;
  try {
    const connection = await connectDB();
    // DELETE
    const [results] = await connection.query('DELETE FROM tareas WHERE idTarea = ? AND idUsuario = ?', [idTarea,id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" }); // tarea no encontrada
    }
    return res.json({ message: "Tarea borrada exitosamente", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar tarea" }); // error del servidor
  }
}

export {
  tasks,
  createTask,
  modifyTask,
  deleteTasks,
};
