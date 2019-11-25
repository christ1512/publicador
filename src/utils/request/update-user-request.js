const { check, validationResult } = require('express-validator')
const User =require('../../models/Users')

let userUpdateRequestRules = ( () => {
    return [
        
        check('direccion').notEmpty().withMessage('La direccion es requerida'),

        check('telefono').notEmpty().withMessage('El telefono es requerida')
            .isNumeric().withMessage('El telefono es invalido'),

        check('dpi').notEmpty().withMessage('El DPI es requerido')
            .isNumeric().withMessage('El DPI es invalido'),

        check('estado').isNumeric().withMessage('El estado es invalido'),
    ]
})

let validateUpdate = ( (req,res,next)=>{
    
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next()
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
})

module.exports = { userUpdateRequestRules, validateUpdate }