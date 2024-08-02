const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const {
  signupHandler,
  loginHandler,
  getUserHandler,
  updateHandler,
  deleteHandler,
  sendOtpHandler,
} = require("../controllers/userHandler");

userRouter.post("/sendOtp",sendOtpHandler );
userRouter.post("/signup", signupHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/get", auth, getUserHandler);
userRouter.post("/update", auth, updateHandler);
userRouter.get("/delete", auth, deleteHandler);
userRouter.get("/delete", auth, deleteHandler);



module.exports = userRouter;

