const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nombre, email, contrasenia } = req.body;
    console.log('Registro:', req.body);

    if(!nombre || !email || !contrasenia) {
        return res.status(400).send('Porfavor complete todos los campos');
    }

    db.query('SELECT nombre FROM usuarios WHERE nombre = ? OR email = ?',
        [nombre, email], async (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error en la consulta');
        }

        if (results.length > 0) {
            return res.status(409).send('estos datos ya existen');
        }

        const hashedPassword = await bcrypt.hash(contrasenia, 8);

        db.query('INSERT INTO usuarios SET ?', 
        { nombre, email, contrasenia: hashedPassword }, 
        (error, results) => {
            if (error) {
                console.error('Error en la consulta:', error);
                return res.status(500).send('Error en la consulta');
            }
            res.status(201).send('Usuario registrado exitosamente');
        });
    });
};

exports.login = async (req, res) => {
    const {email, contrasenia} = req.body;
    console.log('Inicio de sesion', req.body);

    if (!email || !contrasenia) {
        return res.status(400).send('Porfavor ingrese correctamente sus datos');
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', 
    [email], async (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error en la consulta');
        }

        if (results.length === 0 || !(await bcrypt.compare(contrasenia, results[0].contrasenia))) {
            return res.status(401).send('Email o contraseña incorrectos');
        }

        const token = jwt.sign({ id: results[0].id }, 'secretkey', {
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    });
};







