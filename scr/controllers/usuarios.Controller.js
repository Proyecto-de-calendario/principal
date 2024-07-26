const { connectDB } = require('./db'); // Importa la función para conectar a la base de datos

async function obtenerUsuario(req, res) {
    try {
                const id = +req.params.id;
                const connection = await connectDB();
                const [results] = await connection.query('SELECT email FROM usuarios WHERE idUsuario = ?', [id]);
                return res.json([results]);
            } catch(error) {
                res.status(400).send("error al enviar")
            }
        }
async function crearUsuario(req, res) {
    try{
                const id = Math.floor(Math.random() * Math.pow(10, 9));
                const {email,contrasenia} = req.body;
                const connection = await connectDB();
         if (!id||!email||!contrasenia) {
                 return  res.json({ message: "faltan datos obligatorios"});
    }
                const [result] = connection.query('INSERT INTO usuarios(idUsuario,email,contraseña) VALUES(?, ?, ?)', [id,email,contrasenia]);
                res.json({ message: "usuario creado",id});
                connection.end;
} catch(error) {
                res.status(400).send("error al enviar")
    }
}
  async function eliminarUsuario(req,res) {
    try {
        const iden = req.params.id;
        const id = +iden;
        const connection = await connectDB();
        const [results] = await connection.query('delete FROM usuarios where idUsuario = ?',[id]);
        return res.json([results]);
        
        } catch(error) {
            res.status(400).send("error al borrar")
        }
  }
  module.exports = {
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario
  };