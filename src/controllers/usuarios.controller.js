const { connectDB } = require("../baseDeDatos");
const validarJWT = require("../helpers/validarJWT");

const ctrl = {};

ctrl.obtenerusuario = async (req, res) => {
    const connection = await connectDB();

    const [results] = await connection.query('SELECT * FROM usuarios');

    return res.json(results);

}

ctrl.crearUsuario = async (req, res) =>{

    const { nombre, email, edad } = req.body;

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

        const connection = await connectDB();

        // Ejecutamos la consulta de inserción.
        await connection.query('INSERT INTO usuarios (idUsuario, emailUsuario, edadUsuario) VALUES (?,?,?)', [nombre, email, edad]);


        // Respondemos al cliente.
        res.json({
            msg: 'usuario creado'
        })
    }

}