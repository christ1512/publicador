const jwt = require('jsonwebtoken')
const message = require('../../resp/messajes')

let verificaAuth = ( (req, res, next)=>{
    let token = req.get('Authorization')

    jwt.verify( token, 'publicador-v-1',( err, decoded)=>{
        if( err ){
            return res.status(401).json({
                status:message.no_token,
                data:err
            })
        }

        req.user = decoded.user
        next()
    })
})

module.exports = verificaAuth