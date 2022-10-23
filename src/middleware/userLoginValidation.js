const { body } = require("express-validator");
const path = require('path');
console.log("paso x el userLoginValidation")

const userLoginValidation = [
    body("email")
        .notEmpty().withMessage("El campo no puede estar vacío").bail()
        .isEmail().withMessage("El formato de correo no es válido").bail(),
        // la validacion de mail registrado la realizo desde el controlador de user

    body("password")
        .notEmpty().withMessage("El campo no puede estar vacío").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres").bail()
        // la validacion de password correcta la realizo en el controlador de user
    ]

    module.exports = userLoginValidation;