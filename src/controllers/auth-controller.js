const User = require('../models/Users')
const message = require('../utils/resp/messajes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


login = ( (req, res)=>{
    let email = req.body.email
    let password = req.body.password
    User.findOne({email},( err, user)=>{
        try {
            
            if( user && bcrypt.compareSync( password, user.password ) ){
                let token = jwt.sign({
                    user:user
                },'publicador-v-1',{ expiresIn: 60 * 60 * 24 * 30 })
    
                user.token = token
                
                res.status(200).json({
                    status:message.success,
                    data:user
                })
            }else{
                res.status(200).json({
                    status:message.login_invalid,
                    data:null
                })
            }
        } catch (error) {
            console.log(`ERROR: login ${ error }`)
            res.status(500).json({
                status:message.error,
                data:null
            })
        }
    })
});



module.exports = {
    login
}
