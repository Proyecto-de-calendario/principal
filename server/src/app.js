const express = requir('express');
const app = express();
const path = require('path');
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ruta para servir archivos estaticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '..', '..', 'client'))) 

//Importar rutas de autenticacion
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

//Ruta ppara servir el archivo about.html por defecto
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'about.html'))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
});