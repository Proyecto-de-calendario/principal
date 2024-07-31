const jwt = require('jsonwebtoken');

const generarJWT = (idUser)=>{
    return new Promise((resolve, reject) => {

        // Para generar un token se utiliza el metodo sign que significa firmar.
        // Recibe como primer parametro la informacion y como segundo el 'secret' que seria la firma del token.
        jwt.sign(idUser, 'mysecret',{
            // Se establece un tiempo de duración del token.
            expiresIn: 60*60
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}

module.exports = generarJWT;