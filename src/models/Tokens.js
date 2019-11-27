const mongoose = require('mongoose')
const {Schema}= mongoose

const TokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    estado:{
        type:Number,
        default:1
    },
    currentToken:{
        type:String
    },
    lastToken:{
        type:String
    }
})

module.exports=mongoose.model('Token',TokenSchema)