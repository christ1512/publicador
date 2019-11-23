/*module.exports={
    loginUser:async(req,res)=>{
        res.status(200).json({message:'login iniciado'})
    }
}*/
const message = require('../resp/messajes')
const User = require('../models/Users')
const bcrypt = require('bcryptjs');


list = ( (req, res)=>{
    let lstUser = User.find().exec();
    
    lstUser.then( (users) =>{
    
        return res.status(200).json({
            status:message.success,
            data:users
        })
        
    }).catch( e => {
        console.log("ERROR: lista de usuarios: "+e )
        return res.status(500).json({
            statusCode:message.error,
            data:null
        })
    })
})

show = ( (req,res)=>{
    let id = req.params.id
    User.findById({ '_id':id }).exec( (err, objUser)=>{
        try{
            
            if( !objUser ){
                return res.status(200).json({
                    status:message.no_register,
                    data:null
                })    
            }
    
            return res.status(200).json({
                status:message.success,
                data:objUser
            })

        }catch( e ){
            console.log("ERROR: show de usuarios: "+err )
            return res.status(500).json({
                status:message.error,
                data:null
            })    
        }
    });
})

create = ( (req, res)=>{
    let body = req.body
    let objUser = new User({
        nombre:body.nombre,
        password:bcrypt.hashSync(body.password),
        //password:body.password,
        direccion:body.direccion,
        telefono:body.telefono,
        responsable:body.responsable,
        dpi:body.dpi,
        email:body.email,
        estado:body.estado,
        fecha:body.fecha,
    }).save()

    objUser.then( user =>{
        
        res.status( 201 ).json({
            status:message.create,
            data:user
        })

    }).catch( err =>{
        console.log("ERROR: create de usuarios: "+err )
        return res.status(500).json({
            status:message.error,
            data:null
        })
    })
})

module.exports = {
    list, show, create
}