const mongoose = require("mongoose")
require('dotenv').config()
const commentSchema= new mongoose.Schema(
    {
       user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
       },
       post:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
       },
       text:{
        type:String
       },
       date:{
        type:Date,
       }
        
    }
)
module.exports = mongoose.model("Comment",commentSchema)