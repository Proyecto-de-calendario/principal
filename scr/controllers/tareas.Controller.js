const { connectDB } = require('./db'); // Importa la función para conectar a la base de datos

async function obtenerTareas(req, res) {

    tareas.get('/:id', async (req, res) => {
        try{
          const usuario = req.params.id;
          const id = +usuario; 
          const connection = await connectDB();
          const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ?', [id]);
          return res.json([results]); 
        } catch (error) {
          res.status(400).send('Error al enviar');
        }
      });
    res.json([results]);
}

async function crearTarea(req, res) {
    router.post('/:id', async (req, res) => {
        const usuario = req.params.id;
        const id = +usuario;
        const idTarea = Math.floor(Math.random() * Math.pow(10, 9));
        const fechaCreacion = new Date();
        const { tarea, fechaFin, prioridad } = req.body; 
        try {
          const connection = await connectDB();
          if (!tarea || !fechaFin || !prioridad) {
            return res.json({ message: "Faltan datos obligatorios" });
          }
          const [existingTask] = await connection.query('SELECT 1 FROM tareas WHERE idTarea = ?', [idTarea]);
          if (existingTask.length > 0) {
            return res.status(400).json({ message: "Ya existe una tarea con este ID" });
          }
      
          const [result] = await connection.query(
            'INSERT INTO tareas(idTarea, idUsuario, nombreTarea, prioridadTarea, fechaIngresoTarea, fechaFinTarea) VALUES(?, ?, ?, ?, ?, ?)',
            { idTarea, id, tarea, fechaCreacion, prioridad, fechaFin }
          );
          res.json({ message: "Tarea creada", result });
          connection.end();
        } catch (error) {
          res.status(400).send('Error al crear');
        }
      });
    }
async function borrarTarea(req, res) {
  try {
    router.delete('/:idTarea', async (req, res) => {
        try {
          const id = +req.params.idTarea;
          const connection = await connectDB();
          const [results] = await connection.query('DELETE FROM tareas WHERE idTarea = ?', [id]);
          return res.json([results]);
        } catch (error) {
          res.status(400).send('Error al borrar');
        }
      });
    res.json([results]);
  } catch (error) {
    res.status(400).send('Error al borrar');
  }
}

module.exports = {
  obtenerTareas,
  crearTarea,
  borrarTarea,
};