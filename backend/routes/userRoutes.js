const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const {
  signupHandler,
  loginHandler,
  getUserHandler,
  updateHandler,
  deleteHandler,
} = require("../controllers/userHandler");

userRouter.post("/signup", signupHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/get", auth, getUserHandler);
userRouter.post("/update", auth, updateHandler);
userRouter.get("/delete", auth, deleteHandler);
module.exports = userRouter;
