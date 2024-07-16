
const express = require('express');
const connectDB = require('./dataBase');
app = express();

app.use(express.json());

app.get('/users/:id', async (req,res) => {
    try {
        const id = +req.params.id;
        const connection = await connectDB();
        const [results] = await connection.query('SELECT email FROM usuarios WHERE idUsuario = ?', [id]);
        return res.json([results]);
    } catch(error) {
        res.status(400).send("error al enviar")
    }
});
app.post('/users', async(req,res) => {
try {
const usuario = new Date().getTime();
    const id = +usuario;
    const {email,contrasenia} = req.body;
    
    const connection = await connectDB();
    if (!id||!email||!contrasenia) {
    return  res.json({ message: "faltan datos obligatorios"});
    }
    const [result] = connection.query('INSERT INTO usuarios(idUsuario,email,contraseña) VALUES(?, ?, ?)', [id,email,contrasenia]);
    res.json({ message: "usuario creado",result });
    connection.end;
    } catch(error) {
    res.status(400).send("error al enviar")
    }
    });
    
    app.delete('/users/:id', async (req,res) => {
        try {
        const iden = req.params.id;
        const id = +iden;
        const connection = await connectDB();
        const [results] = await connection.query('delete FROM usuarios where idUsuario = ?',[id]);
        return res.json([results]);
        
        } catch(error) {
            res.status(400).send("error al borrar")
        }
    });

    app.get('/tasks/:id', async (req,res) => {
        try {
            const id = +req.params.id;
            const connection = await connectDB();
            const [results] = await connection.query('SELECT * FROM tareas WHERE idUsuario = ?', [id]);
            return res.json([results]);
        } catch(error) {
            res.status(400).send("error al enviar")
        }
    });
    app.post('/tasks/:id', async(req,res) => {
    
    
        const id = params.req.id;
        const {tarea,fechaCreacion,fechaFinalizacion,prioridad} = req.body;
        try {
           const fechaCreacion = new Date().getTime();
        const connection = await connectDB();
        if (!id||!tarea||!fechaFinalizacion||!prioridad) {
        return  res.json({ message: "faltan datos obligatorios"});
        }
        const [result] = connection.query('INSERT INTO tareas( idTarea, idUsuario, nombreTarea, fechaInTarea, prioridadTarea, fechaFinTarea) VALUES(?, ?, ?, ?, ?, ?)', [fechaCreacion,id,tarea,fechaCreacion,prioridad,fechaFinalizacion]);
        res.json({ message: "Tarea creada",result });
        connection.end;
        } catch(error) {
        res.status(400).send("error al crear")
        }
        });
        
        app.delete('/tasks/:idTarea', async (req,res) => {
            try {
            const iden = req.params.idTarea;
            const id = +iden;
            const connection = await connectDB();
            const [results] = await connection.query('delete FROM tareas where idTarea = ? ',[id]);
            return res.json([results]);
            
            } catch(error) {
                res.status(400).send("error al borrar")
            }
        });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));