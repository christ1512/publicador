const { check, validationResult } = require('express-validator')

let AuthRequestRules = ( () => {
    return [
        
        check('password').notEmpty().withMessage('La contraseña es requerida'),

        check('email').notEmpty().withMessage('El email es requerido')
            .isEmail().withMessage('El email es invalido'),
        
    ]
})

let validateAuth = ( (req,res,next)=>{
    
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next()
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
})

module.exports = { AuthRequestRules, validateAuth }