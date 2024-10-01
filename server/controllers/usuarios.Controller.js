import { hashSync, compareSync } from 'bcrypt';
import {generarJWT} from '../helpers/generarJWT.js';
import {validarJWT} from '../helpers/validarJWT.js';
import {connectDB} from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const connection = await connect();
    const sql = "SELECT * FROM users WHERE email = ?";
    const [user] = await connection.query(sql, [username]);
    const isPasswordValid = await bcrypt.compare([password], user.contraseña)
    // Validación de usuario
    if (!user[0].length === 0) {
      return res.status(401).json({ message: "no existe el usuario" });
    }
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    } else {

      // Generar token JWT
      const token = await generarJWT(user[0].id);
      // Almacenar el token en la sesión del servidor
      req.session.token = token;
      // Almacenar el token en una cookie segura
      res.cookie("authToken", token, {
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 3600000, // Expiración en milisegundos (1 hora)
      });
      return res.json({ message: "Inicio de sesión exitoso" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}

async function crearUsuario(req, res) {
  const { nombre, email, password } = req.body;
  const id = Math.floor(Math.random() * Math.pow(10, 9));
  const hashContrasenia = hashSync(password, 10); 
  try {
    const sql = 'INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
    [user] = await connection.query(sql, [id, nombre, email, hashContrasenia]);
    
    res.json({
      msg: 'Registrado correctamente',
    });
    connection.end(); 
    // Validación de usuario
    if (!user[0].length === 0) {
      return res.status(401).json({ message: "no existe el usuario" });
    }
    if (user[0].contraseña === hashContrasenia) {
      // Generar token JWT
      const token = await generarJWT(user[0].id);
      // Almacenar el token en la sesión del servidor
      req.session.token = token;
      // Almacenar el token en una cookie segura
      res.cookie("authToken", token, {
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 3600000, // Expiración en milisegundos (1 hora)
      });
      return res.json({ message: "Inicio de sesión exitoso" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}
  async function eliminarUsuario(req, res) {
    
      const id = +req.params.id;
  try {
        // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.headers.token;

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
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al borrar.' }); 
    }
  }

  async function verificarUsuario(req, res) {
    const { email, contrasenia } = req.body;
    
    try {
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
    
      const { nombre, email, contrasenia } = req.body;
  try {
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
    login,
    crearUsuario,
    eliminarUsuario,
    verificarUsuario,
    modificarUsuario
  };