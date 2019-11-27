const jwt = require('jsonwebtoken')
const message = require('../../resp/messajes')
const Token = require('../../../models/Tokens')

/**let verificaAuth = (req, res, next)=>{
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
}**/

getToken=(req,res,next)=>{//tmamos el token del front
    try{
        const bearerHeaders=req.headers.authorization
        if(typeof bearerHeaders!=='undefined'){
            const bearer=bearerHeaders.split(" ")
            const bearerToken=bearer[1]
            req.token=bearerToken
            next()
        }else{
            res.status(403).json({status:message.no_permission,data:null})
        }
    }catch(error){
        console.log(`ERROR: login ${ error }`)
        res.status(500).json({
            status:message.error,
            data:null
    })}

}

compareToken=async(req, res,next)=>{
    try {
        const user = await  jwt.verify(req.token,'publicador-v-1')//verificamos si es un token valido
        if(user){//si es un token
            const userTokenVerify = await Token.findOne({user:user.user._id})//comprobamos desde la bd en la coleccion token  que si tenga tokens registrados
            if(userTokenVerify){
                if(userTokenVerify.lastToken===req.token){//comparamos el req.token con el token almacenado en la bd
                    res.status(403).json({message:'Este token ya ha sido usado cree un nuevo token!'})//si es igual este token ya ha sido usado
                 }else{
                    if(userTokenVerify.currentToken===req.token){
                        req.user=user
                        next()
                    }else{
                        res.status(403).json({message:'Este no es su token'})
                    }
                 }
            }else{
                res.status(403).json({message:'No es un usuario del sistema!'})
            }
        }else{//fin user if
            res.status(403).json({message:'Su toke ya no es valido, vuelva a iniciar session!'})
        }
    } catch (error) {
        res.status(403).json({message:'Algo esta mal al comparar su token',error})
    }
}


destroyToken=async(req,res)=>{
    try {
        const user= await jwt.verify(req.token,'publicador-v-1')
        if(user){
            const lastToken= await Token.findOneAndUpdate({user:user.user._id},{$set:{lastToken:req.token,currentToken:"0"}})
           
            if(lastToken){
               req.token=''
               res.status(200).json({message:'Cerro sesion exitosamente!',log:false})
               
            }else{
                res.status(403).json({message:'Fallo al cerrar sesion!'})
            }
           
        }else{
            res.status(403).json({message:'Ustede no ha iniciado sesion',log:false})
        }
    } catch (error) {
        //algun error
        res.status(403).json({message:'Ustede no ha iniciado sesion',log:false})
    }
}

module.exports = {getToken,compareToken,destroyToken}