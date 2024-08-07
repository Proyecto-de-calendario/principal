const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '..', '..', 'client'))); 

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');
console.log(authRoutes); // <-- Agregar esto para verificar qué se está importando
app.use('/auth', authRoutes);

// Ruta para servir el archivo about.html por defecto
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'about.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});
