const express = require('express');
const connectDB = require('../scr/dataBase');
app = express();

app.use(express.json());

app.get('/users/:id', async (req,res) => {
    const iden = req.params.id;
    const id = +iden;
    const connection = await connectDB();
    const [results] = await connection.execute('SELECT * FROM usuarios where id = ?',{id});
    return res.json(results);
});
app.post('/users', async(req,res) => {
    try {
    const {email,contrasenia} = req.body;
    const connection = await connectDB();
    const result = connection.query('insert into usuarios (email,contraseña) values(?,?)',{email,contrasenia});
    res.json({ message: "usuario creado",result });
    connection.end;
    } catch(error) {
        res.status(400).send("error al enviar")
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));