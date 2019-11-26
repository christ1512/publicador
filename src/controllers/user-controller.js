const message = require('../utils/resp/messajes')
const User = require('../models/Users')
const bcrypt = require('bcryptjs');


list = ( async (req, res) => {

    try {
        let lstUser = await User.find();
        return res.status(200).json({
            status:message.success,
            data:lstUser
        })
    } catch ( err ) {
        console.log("ERROR: lista de usuarios: "+e )
        return res.status(500).json({
            statusCode:message.error,
            data:null
        })
    }

})

show = ( async ( req, res ) => {
    
    try {
        let id = req.user._id
        let objUser = await User.findById({'_id':id})
        
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

    } catch ( err ) {
        console.log("ERROR: show de usuarios: "+err )
        return res.status(500).json({
            status:message.error,
            data:null
        })
        
    }
})

create = ( async (req, res)=>{
    let body = req.body
    let objUser = await new User({
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

updateUser = ( async( req, res)=>{
    let id = req.user._id
    let body = req.body
    let dataUpdate = {
        direccion:body.direccion,
        telefono:body.telefono,
        dpi:body.dpi,
        estado:body.estado
    }
    try {
        objUser = await User.findByIdAndUpdate( id, dataUpdate, {new:true})
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

    } catch ( err ) {
        console.log("ERROR: update usuarios: "+err )
        return res.status(500).json({
            status:message.error,
            data:null
        })
    }
    
})

module.exports = {
    list, show, create, updateUser
}