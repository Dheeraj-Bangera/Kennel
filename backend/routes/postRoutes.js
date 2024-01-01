const express = require("express");
const postRouter = express.Router();
const auth = require("../middleware/auth");
const {createPostHandler,getPostHandler,updatePostHandler,deletePostHandler} = require("../controllers/postHandler")

postRouter.post("/create",auth, createPostHandler);
postRouter.get("/get/:id",auth, getPostHandler);
postRouter.post("/update",auth, updatePostHandler);
postRouter.post("/delete",auth, deletePostHandler);
module.exports = postRouter;