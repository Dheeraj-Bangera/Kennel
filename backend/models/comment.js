const mongoose = require("mongoose")
require('dotenv').config()
const commentSchema= new mongoose.Schema(
    {
       user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
       },
       post:{
        type:mongoose.Types.ObjectId,
        ref:"post"
       },
       text:{
        type:String
       },
       date:{
        type:Date,
       }
        
    }
)
module.exports = mongoose.model("comment",commentSchema)