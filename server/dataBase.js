// Requerimos mysql.
import { createConnection } from 'mysql2/promise';

// Creamos una funcion para realizar la conexion a la bd.
const connectDB = async ()=> {
    try {
    return await createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'freehealth_database'
    })
} catch (error){
res.json({error})
}
}

// Exportamos la funcion para realizar la conexion desde cualquier archivo.
export {connectDB}
