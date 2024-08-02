const express = require("express");
const postRouter = express.Router();
const auth = require("../middleware/auth");
const {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  getMyPostsHandler,
  getAllPostsHandler,
  searchHandler,
} = require("../controllers/postHandler");

postRouter.post("/create", auth, createPostHandler);
postRouter.get("/getAllPost", auth, getAllPostsHandler);
postRouter.get("/get/:id", getPostHandler);
postRouter.get("/getMypost", auth, getMyPostsHandler);
postRouter.post("/update", auth, updatePostHandler);
postRouter.post("/delete/:id", auth, deletePostHandler);
postRouter.get("/search",  searchHandler);
module.exports = postRouter;
