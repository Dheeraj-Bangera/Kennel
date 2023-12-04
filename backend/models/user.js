const mongoose = require("mongoose")
require('dotenv').config()
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        address:{
            type:String,
        
        },
        city:{
            type:String,
        },
        pincode: {
            type:Number,
        },
        token:{
            type:String,
        },
        post:[{
            type:mongoose.Types.ObjectId,
            ref:"post"
        }],
        adopted_animal:[{
            type:mongoose.Types.ObjectId,
            ref:"post"
        }],
        comments:[{
            type:mongoose.Types.ObjectId,
            ref:"comment"
        }],
        date:{
            type:Date,
            default: Date.now()
            
        }
        
    }
)
module.exports = mongoose.model("user",userSchema)