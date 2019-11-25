const { check, validationResult } = require('express-validator')

let userRequestRules = ( () => {
    return [
        // username must be an email
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').isEmail().withMessage('El correo es invalido'),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 })
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