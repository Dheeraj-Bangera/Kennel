const User = require("../models/user");
const Post = require("../models/post")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createPostHandler = async (req, res) => {
   return res.json({message:"true"})
}
const getPostHandler = async (req, res) => {
   return res.json({message:"true"})
}
const updatePostHandler = async (req, res) => {
   return res.json({message:"true"})
}
const deletePostHandler = async (req, res) => {
   return res.json({message:"true"})
}
module.exports = {createPostHandler,getPostHandler,updatePostHandler,deletePostHandler};
