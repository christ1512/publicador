const { Schema, model }=require('mongoose')
const bcrypt=require('bcryptjs')

const UserSchema =new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true,
    },
    telefono:{
        type:Number,
        required:true
    },
    responsable:{
        type:String,
        required:true
    },
    dpi:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    estado:{
        type:Number,
        default:1
    },
    fecha:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        required:false
    }
}) 
UserSchema.methods.encryptPassword=async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password,salt)
    return hash
}

UserSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports=model('User',UserSchema)
