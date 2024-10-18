import {connectDB} from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function tasks(req, res) {
  try { 
    const id = +req.user.id; // Verifcar que existe el id
    if (!id || isNaN(id)) { 
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

async function createTask(req, res) {
  const id = +req.user.id;
  const idTarea = Math.floor(Math.random() * Math.pow(10, 9));
  const { tarea , horaInicio, horaFin, prioridad, dia } = req.body;

  try {

    // 1. Basicas
    if (!tarea || !horaFin || !horaInicio || !prioridad || !dia) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    } 
    if (typeof tarea !== 'string' || tarea.trim() === '') {
      return res.status(400).json({ message: "Nombre de tarea inválido" });
    }
    if (typeof horaInicio !== 'string' || fechanicio.trim() === '') {
      return res.status(400).json({ message: "hora de inicio inválida" });
    }
    if (typeof horaFin !== 'string' || fechaFin.trim() === '') {
      return res.status(400).json({ message: "Fecha de Fin inválida" }); 
    }
    if (typeof prioridad !== 'number' || isNaN(prioridad)) {
      return res.status(400).json({ message: "Prioridad inválida" }); 
    }

    // 2. Validacion Database
    const connection = await connectDB(); 
    const [existingTask] = await connection.query('SELECT * FROM tareas WHERE idTarea = ?', [idTarea]);
    if (existingTask.length > 0) {
      return res.status(400).json({ message: "Ya existe esta tarea" });
    }

    // 3. Insert
    const [result] = await connection.query(
      'INSERT INTO tareas(idTarea, idUsuario, nombre, prioridad, horaInicio, horaFin, dia) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [idTarea, id, tarea, prioridad, horaInicio, horaFin, dia]
    );
    res.json({ message: "Tarea creada", result });
    connection.end();

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error" }); 
  }
}

async function modifyTask(req,res){

}

  async function deleteTasks(req, res) {
    try {
      const idTarea = +req.params.idTarea; 
      if (!idTarea || isNaN(idTarea)) {
        return res.status(400).json({ message: "Tarea ID inválido" }); 
      }
  
      const connection = await connectDB(); 
  
      // DELETE
      const [results] = await connection.query('DELETE FROM tareas WHERE idTarea = ?', [idTarea]); 
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