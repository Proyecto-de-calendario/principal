import { hashSync, compareSync } from 'bcrypt';
import {generarJWT} from '../helpers/generarJWT.js';
import {validarJWT} from '../helpers/validarJWT.js';
import {connectDB} from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function obtenerUsuario(req, res) {
    try {
        const id = +req.params.id;

        // 1. validacion de ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'ID invalido' });
        }

        const connection = await connectDB(); 

        // 2. Query Database
        const [results] = await connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);

        // 3. resultado vacio
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // 4. resultado parcial
        return res.json(results);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error interno del servidor.' });
    }

}
async function crearUsuario(req, res) {
  try {
    const { nombre, email, contrasenia } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // 1. Validacion de email 
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Correo electrónico inválido.' });
    }
    
    // 2. Contraseña
    if (!contrasenia || contrasenia.length < 8) {
      return res.status(400).json({ error: 'Contraseña debe ser al menos 8 caracteres.' });
    }
    const connection = await connectDB();
    // 3. Validar existencia de usuario
    const [existeUsuario] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existeUsuario.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
      
    }

    // 4. Validacion de nombre
    if (!nombre || nombre.length < 3) {
      return res.status(400).json({ error: 'Nombre debe tener al menos 3 caracteres.' });
    }

    const id = Math.floor(Math.random() * Math.pow(10, 9));
    const hashContrasenia = hashSync(contrasenia, 10); 

    const sql = 'INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
    await connection.query(sql, [id, nombre, email, hashContrasenia]);
    
    res.json({
      msg: 'Registrado correctamente'
    });
    connection.end(); 
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
        // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.headers.token;

    // En caso de que no exista el token, retornamos un mensaje de error.
    if(!token) {
        return res.status(401).json({
            msg: 'No estas autorizado para realizar esta acción'
        });
    } else {

        // Utilizamos el helper para validar el token.
        const usuario = await validarJWT(token);
        // delete query
      const connection = await connectDB();
      const [results] = await connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [usuario.idUsuario]);
  
      // usuario no encontrado
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' }); 
      }
      
      res.json({ message: "Usuario eliminado", results }); 
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al borrar.' }); 
    }
  }
  async function verificarUsuario(req, res) {
    try {
      const { email, contrasenia } = req.body;
  
      const connection = await connectDB(); 
  
      // 3. Insert Query
      const sql ='SELECT * FROM usuarios WHERE email = ?'; 
      const [buscarUsuario] = await connection.query(sql, email);
    
      // En caso de que no se encuentre ningun usuario, retornamos un error.
      if(!buscarUsuario[0]){
          return res.status(400).json({
              msg: 'El usuario no existe'
          })
      }
  
      // Comparamos las contraseñas con el metodo compareSync que nos devolvera un true o false.
      const validarContrasenia = compareSync(contrasenia, buscarUsuario[0].contraseña);
  
      // En caso de que no coincidan, retornamos un error sin dar información especifica de lo que fallo.
      if(!validarContrasenia){
          return res.status(401).json({
              msg: 'El usuario o contraseña no coiciden'
          })
      }
  
      // Hacemos uso del helper para generar el token y le pasamos el id.
      const token = await generarJWT({id: buscarUsuario[0].idUsuario});
  
      //Retornamos el token con un mensaje al cliente.
      return res.json({
          msg: 'Inicio de sesión exitoso',
          token
      })
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' }); 
    }
  }

  async function modificarUsuario() {
    try {
      const { nombre, email, contrasenia } = req.body;
  
      const connection = await connectDB();
      // 3. Validar existencia de usuario
      const [existeUsuario] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (existeUsuario.length > 0) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        
      }
  
      // 4. Validacion de nombre
      if (!nombre || nombre.length < 3) {
        return res.status(400).json({ error: 'Nombre debe tener al menos 3 caracteres.' });
      }
  
      const id = Math.floor(Math.random() * Math.pow(10, 9));
      const hashContrasenia = hashSync(contrasenia, 10); 
  
      const sql = 'INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
      await connection.query(sql, [id, nombre, email, hashContrasenia]);
      
      res.json({
        msg: 'Registrado correctamente'
      });
      connection.end(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  } 
  
  
  export {
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario,
    verificarUsuario,
    modificarUsuario
  };