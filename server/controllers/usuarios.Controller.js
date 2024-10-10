import   { hashSync,compareSync }  from 'bcrypt';
import {generateJWT} from '../helpers/generarJWT.js';
import {validateJWT} from '../helpers/validarJWT.js';
import {connectDB} from '../dataBase.js'; // Importa la función para conectar a la base de datos

async function login (req, res) {
  const { email, password } = req.body;
const sql = "SELECT * FROM usuarios WHERE email = ?";

  try {
    const connection = await connectDB();
    const row = await connection.query(sql, email);
    const user = row[0][0];
    if (!user) {
      return res.status(401).json({ message: "no existe el usuario" });
    }
    const isPasswordValid = compareSync (password,user.contraseña ); 
    // Validación de usuario
    if (user.length === 0) {
      return res.status(401).json({ message: "no existe el usuario" });
    }
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    } else {

      // Generar token JWT
      const token = await generateJWT(user.idUsuario);
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

async function createUser(req, res) {
  const { nombre, email, password } = req.body;
  const id = Math.floor(Math.random() * Math.pow(10, 9));
  const hashContrasenia = hashSync(password, 10);

  try {
    const connection = await connectDB(); // Asegúrate de conectar a la base de datos
    const sql = 'INSERT INTO usuarios (idUsuario, nombre, email, contraseña) VALUES (?, ?, ?, ?)';
    const [rows] = await connection.query(sql, [id, nombre, email, hashContrasenia]);
    const user = rows;

    res.json({
      msg: 'Registrado correctamente',
    });

    connection.end();

    // Validación de usuario
    if (user.length === 0) {
      return res.status(401).json({ message: "no existe el usuario" });
    }
    
    if (user.contraseña === hashContrasenia) {
      // Generar token JWT
      const token = await generateJWT(user.idUsuario);
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

  async function removeUser (req, res) {
    
      const id = +req.params.id;
  try {
        // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.headers.token;

        // Utilizamos el helper para validar el token.
        const usuario = await validateJWT(token);
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

  async function verifyUser (req, res) {
    const { email, password } = req.body;
    
    try {
      const connection = await connectDB(); 
  
      // 3. Insert Query
      const sql ='SELECT * FROM usuarios WHERE email = ?'; 
      const user = await connection.query(sql, email);
    const validateUser = user[0][0];
      // En caso de que no se encuentre ningun usuario, retornamos un error.
      if(!validateUser){
          return res.status(400).json({
              msg: 'El usuario no existe'
          })
      }
  
      // Comparamos las contraseñas con el metodo compareSync que nos devolvera un true o false.
      const validatePassword = compareSync(password, validateUser.contraseña);
  
      // En caso de que no coincidan, retornamos un error sin dar información especifica de lo que fallo.
      if(!validatePassword){
          return res.status(401).json({
              msg: 'El usuario o contraseña no coiciden'
          })
      }
  
      // Hacemos uso del helper para generar el token y le pasamos el id.
      const token = await generateJWT({id: validateUser.idUsuario});
  
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

  async function modifyUser() {
    
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

  export async function validateSession(req, res) {
    const user = validateJWT();
    if (user === !false) {
      console.log(req.user);
      return res.json({
        message: "acceso permitido a área protegida",
        user: req.user,
      });
    }
  }

      async function logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error al cerrar sesión" });
        }
        res.clearCookie("authToken");
        return res.json({ message: "Cierre de sesión exitoso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error Inesperado" });
    }
  }
  
  export {
    login,
    createUser,
    removeUser,
    verifyUser,
    modifyUser,
    logout
  };