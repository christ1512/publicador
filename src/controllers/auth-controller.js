const User = require('../models/Users')
const message = require('../utils/resp/messajes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//modelo tokens
const Token = require('../models/Tokens')


login = async(req, res)=>{
    let {email,password}=req.body
    
    User.findOne({email},async( err, user)=>{
        try {
            
            if( user && bcrypt.compareSync( password, user.password ) ){
                let token = jwt.sign({ user:user},'publicador-v-1',{ expiresIn: 60 * 60 * 24 * 30 })//generemos token
    
                user.token = token
                
                const findUserTokenId=await Token.findOne({user:user._id})//buscamos en la colecion Token si existe un id que pertenezca a la misma
                if(findUserTokenId){
                    const registerCurrenteToken = await Token.findByIdAndUpdate(findUserTokenId._id,{currentToken:token})
                    if(registerCurrenteToken){
                        res.status(200).json({
                            status:message.success,
                            data:user,
                            token
                        })
                    }else{
                        res.status(403).json({message:'Se genero token pero no ha sido guardado!'})
                    }
                }else{
                    res.status(403).json({message:'El usuario NO es de este sistema!'})
                }
               
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
}



module.exports = {
    login
}
