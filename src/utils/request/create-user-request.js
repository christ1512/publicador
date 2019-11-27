const { check, validationResult } = require('express-validator')
const User =require('../../models/Users')

let userRequestRules = ( () => {
    return [
        // username must be an email
        check('nombre').notEmpty().withMessage('El nombre es requerido'),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 }).withMessage('Debe ingresar al menos 5caracteres')
            .notEmpty().withMessage('La contraseña es requerida'),

        check('direccion').notEmpty().withMessage('La direccion es requerida'),

        check('telefono').notEmpty().withMessage('El telefono es requerida')
            .isNumeric().withMessage('El telefono es invalido'),

        check('responsable').notEmpty().withMessage('El responsable es requerido'),

        check('dpi').notEmpty().withMessage('El DPI es requerido')
            .isNumeric().withMessage('El DPI es invalido'),

        check('email').notEmpty().withMessage('El email es requerido')
            .isEmail().withMessage('El email es invalido')
            
       
    ]
})

let validate = ( (req,res,next)=>{
    
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next()
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
})

module.exports = { userRequestRules, validate }