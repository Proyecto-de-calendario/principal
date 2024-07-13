
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


    const id = +usuario;
    const {email,contrasenia} = req.body;
    try {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));