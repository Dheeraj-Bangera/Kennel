const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary =require("cloudinary").v2

const createPostHandler = async (req, res) => {
  // fetching from req 
  try {
    const {
      id,
      animal,
      animal_name,
      gender,
      description,
      breed,
      address,
      city,
    } = req.body;
    const image = req.files.image;

    // checking for valid data
    if (animal=="" || animal_name == "" || gender === "") {
       return res
       .status(204)
       .json({ message: "Please fill all required fields", success: false });
      }
      // checking if user exists
      let foundUser = await User.findById(id);
      if (!foundUser) {
         return res
         .status(204)
         .json({ message: "User not found", success: false });
      }
      // Image Upload 
    const uploadedImage = await cloudinary.uploader.upload(image.tempFilePath,{folder:"kennel_post_images",resource_type:"auto",quality:20,}); 
    if(!uploadedImage){
      return res.status(400).send({message: "Failed to upload Image",success:false})
    }
      
    //creating a entry in db 
    const newPost = await Post.create({
      animal,
      animal_name,
      gender,
      description,
      breed,
      address,
      image:uploadedImage.secure_url,
      city,
      user:id,
      date: Date.now(),
    });
    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Failed to create post", success: false });
    }
    //updating user model 
    const userModelUpdate = await User.findByIdAndUpdate(id, {
      $push: { post: newPost._id },
    },{new:true});
    if (!userModelUpdate) {
      await Post.deleteOne({ _id: newPost._id }).catch((err) => {
        console.log(err);
      });
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }

    //when all goes well 
    return res
      .status(201)
      .json({ message: "Created successfully!", success: true });
  } catch (error) {
    console.log(error);
  }
};
const getPostHandler = async (req, res) => {
  return res.json({ message: "true" });
};
const updatePostHandler = async (req, res) => {
  return res.json({ message: "true" });
};
const deletePostHandler = async (req, res) => {
  return res.json({ message: "true" });
};
module.exports = {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
};
