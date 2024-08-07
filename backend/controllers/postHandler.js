const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const createPostHandler = async (req, res) => {
  try {
    const id = req.body.userData.id;
    const { animal, animal_name, gender, description, breed, address, city } = req.body;
    const image = req.body?.image;

    // checking for valid data
    if (animal === "" || animal_name === "" || gender === "") {
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

    // Collecting all image URLs
    let imageUrls = [];

    // Uploading media files
    console.log(image);
    if(image && image>0){
      let upImage =null

      for(let i = 0 ;i<image; i++){
        console.log(i);
        if(req.files?.[`image[${i}]`]){
          try{upImage =await cloudinary.uploader.upload(
            req.files?.[`image[${i}]`].tempFilePath,
            {
              folder: "Kennel/post_media",
              resource_type: "auto",
              quality: 20,
            }
            
            )
            console.log(upImage)
            imageUrls = [...imageUrls,upImage.secure_url]
          }catch(err){
              console.log(err);
              return res.send(err)
            }
            
        }
      }

    }

    // creating a post entry in the database
    const newPost = await Post.create({
      animal,
      animal_name,
      gender,
      description,
      breed,
      address,
      image: imageUrls, // Save array of image URLs
      city,
      user: id,
      date: Date.now(),
    });

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Failed to create post", success: false });
    }

    // updating user model
    const userModelUpdate = await User.findByIdAndUpdate(
      id,
      {
        $push: { post: newPost._id },
      },
      { new: true }
    );

    if (!userModelUpdate) {
      await Post.deleteOne({ _id: newPost._id }).catch((err) => {
        console.log(err);
      });
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // when all goes well
    return res
      .status(201)
      .json({ message: "Created successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred", success: false });
  }
};
const getMyPostsHandler = async (req, res) => {
  try {
    const userId = req.body.userData.id;
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Retrieve posts created by the user
    const userPosts = await Post.find({ user: userId }).sort({ date: -1 });

    if (!userPosts) {
      return res
        .status(404)
        .json({ message: "No posts found for this user", success: false });
    }

    // Respond with the user's posts
    return res
      .status(200)
      .json({ message: "Posts retrieved successfully", success: true, posts: userPosts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred", success: false });
  }
};
const getAllPostsHandler = async (req, res) => {
  try {
    // Retrieve all posts
    const allPosts = await Post.find().sort({ date: -1 });

    if (!allPosts || allPosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found", success: false });
    }

    // Respond with all posts
    return res
      .status(200)
      .json({ message: "Posts retrieved successfully", success: true, posts: allPosts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred", success: false });
  }
};




const getPostHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(204).json({ message: "fill params", success: false });
    }
    let post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "post Not Found", success: false });
    } else {
      return res.status(200).json(post);
    }
  } catch (err) {}
};

const updatePostHandler = async (req, res) => {
  try {
    let data;
    const field = req.body.field.toLowerCase();

    if (field === "image") {
      data = req.files.image;
    } else {
      data = req.body.data;
    }

    const postId = req.body.id;
    const userId = req.body.userData.id;

    if (!field || !data || !postId) {
      return res
        .status(204)
        .json({ message: "Please fill all required fields", success: false });
    }

    if (
      field !== "animal" &&
      field !== "animal_name" &&
      field !== "gender" &&
      field !== "description" &&
      field !== "city" &&
      field !== "address" &&
      field !== "image"
    ) {
      return res.json({ message: "Invalid Field!", success: false }).status(204);
    }

    const post = await Post.findById(postId);

    if (post.user.toString() != userId) {
      return res
        .json({ message: "Unauthorized User", success: "false" }).status(401);
    }

    if (field === "image") {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          data.tempFilePath,
          {
            folder: "kennel_post_images",
            resource_type: "auto",
            quality: 20,
          }
        );

        try {
          const publicIdMatch = post.image.match(/\/v\d+\/(.+?)\.[a-zA-Z]+$/);
          const publicId = publicIdMatch ? publicIdMatch[1] : null;
          if (!publicId) {
            return res.json({message:"unable to find old image public id",success:false})
          }
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== 'ok') {
             return res.json({message:"internal sever problem in deleting old image",success:false})
            }
          
        } catch (err) {
          console.log("Unable to delete image:", err);
        }

        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { image: cloudinaryResponse.secure_url },
          { new: true }
        );
        return res.send(updatedPost)
      } catch (err) {
        console.log("Unable to update image:", err);
      }
    } else {
      const jsonData = {
        [field]: data,
      };

      const updatedPost = await Post.findByIdAndUpdate(postId, jsonData, {
        new: true,
      });
      return res.send(updatedPost)
    }
  } catch (error) {
    console.log("Error in updating the post: ", error);
  }
};

const deletePostHandler = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userData.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }


    if (post.user.toString() !== userId) {
      return res.status(401).json({ message: 'Unauthorized User', success: false });
    }

    // Delete the image from Cloudinary
    if (post.image) {
      try {
        const publicIdMatch = post.image.match(/\/v\d+\/(.+?)\.[a-zA-Z]+$/);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (!publicId) {
          return res.json({message:"unable to find old image public id",success:false})
        }
          const result = await cloudinary.uploader.destroy(publicId);
          if (result.result !== 'ok') {
           return res.json({message:"internal sever problem in deleting old image",success:false})
          }
        
      } catch (err) {
        console.log("Unable to delete image:", err);
      }
    }

    // Delete the post from MongoDB
    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


const searchHandler= async (req,res)=>{
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required for searching",
      });
    }

    // Build search criteria using $or and $regex for case-insensitive search
    const searchCriteria = {
      $or: [
        { animal: { $regex: keyword, $options: 'i' } },
        { animal_name: { $regex: keyword, $options: 'i' } },
        { gender: { $regex: keyword, $options: 'i' } },
        { breed: { $regex: keyword, $options: 'i' } },
        { city: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        // Add other fields you want to search within if needed
      ]
    };

    // Find posts matching the search criteria
    const posts = await Post.find(searchCriteria).populate('user').populate('adopted_by');
    // Return the search results
    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }




}
module.exports = {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  getMyPostsHandler,
  getAllPostsHandler,
  searchHandler
};
