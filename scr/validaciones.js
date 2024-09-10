import {body} from 'express-validator'

export const validacionCrearUsuario = [
    body('email')
    .isString().withMessage('el email debe ser un string')
    .notEmpty().withMessage('el email es un campo obligatorio')
    .isEmail().withMessage('el Email debe ser valido'),
    body('contrasenia')
.isString().withMessage('la contraseña debe ser un string')
.notEmpty().withMessage('la contraseña no puede estar vacia')
.isStrongPassword({
    minLength: 8,
    minLowerCase: 1,
    minUpperCase:1,
    minNumbers:1,
    minSymbols:0,
})
.withMessage('la contraseña es muy debil como minimo debe tener 1 mayuscula, 1 número y un minimo de 8 caracteres')
];
export const validarUsuario = [
    param('id')
    .isInt().withMessage('ID debe ser un número entero')
    .notEmpty().withMessage('el ID no existe'),
    header('token').notEmpty().withMessage('Token es requerido')
];

export const validacionModificarUsuario = [
    
    body('email')
    .optional()
    .isString().withMessage('el email debe ser un string')
    .notEmpty().withMessage('el email es un campo obligatorio')
    .isEmail().withMessage('el Email debe ser valido'),
    body('contrasenia')
    .optional()
.isString().withMessage('la contraseña debe ser un string')
.notEmpty().withMessage('la contraseña no puede estar vacia')
.isStrongPassword({
    minLength: 8,
    minLowerCase: 1,
    minUpperCase:1,
    minNumbers:1,
    minSymbols:0,
})
.withMessage('la contraseña es muy debil como minimo debe tener 1 mayuscula, 1 número y un minimo de 8 caracteres')
];