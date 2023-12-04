const mongoose = require("mongoose");
require("dotenv").config();
const postSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true,
  },
  animal_name: {
    type: String,
    required: true,
  },
  gender:{
    type:Boolean,
    required: true,
  },
  image:{
    type: String,
  },
  description: {
    type: String,
  },
  breed:{
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    required:true
  },
  adopted_by:{
    type:mongoose.Types.ObjectId,
    ref:"user",
  },
  comments:[{
    type:mongoose.Types.ObjectId,
    ref:"comments",
  }],
  date:{
    type:Date,
  }
});
module.exports = mongoose.model("post", postSchema);
