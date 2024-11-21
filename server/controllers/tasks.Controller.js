import { connectDB } from '../dataBase.js'; // Importa la función para conectar a la base de datos 

async function tasks(req, res) {
  try {

  const id = +req.user.id;
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ?', [id]);
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }); // error del servidor
  }
}

async function findTask(req, res) {
  try {
  const id = +req.user.id;
  const tarea = req.params.id;
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ? and idTarea = ?', [id,tarea]);
    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // error del servidor
  }
}

 async function createTask(req, res) {
  try {
  const id = req.user.id;
  const { name, priority, startTime, endTime, date } = req.body;
  
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
  const idUser = req.user.id;
  const { id, name, priority, startTime, endTime, date } = req.body;
  console.log(id);
  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      'UPDATE tareas SET nombre = ?, prioridad = ?, fechaInicio = ?, fechaFin = ?, dia = ? WHERE idTarea = ? and  idUsuario = ?',
      [ name, priority, startTime, endTime, date, id, idUser ]
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
  findTask
};