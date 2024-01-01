const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signupHandler = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const phoneNo = req.body.phoneNumber;
    // console.log(name,email,password);

    const findUser = await User.findOne({ phoneNumber: phoneNo });
    if (name == "" || email == "" || password == "" || phoneNo == null) {
      res
        .status(204)
        .json({ message: "Please fill all fields", success: "false" });
    }
    if (findUser) {
      res
        .status(403)
        .json({ message: "Email already exists", success: "false" });
    } else {
      const newUser = await User.create({
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNo,
      });
      res.json({
        message: "Account created successfully",
        succes: "true",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const loginHandler = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res
        .status(204)
        .json({ message: "Please fill all fields", success: "false" });
    } else {
      let user = await User.findOne({ email });
      if (!user) return res.sendStatus(401, "Invalid credentials");
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          id: user._id,
          email: user.email,
          name: user.name,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "10m",
        });
        await User.findByIdAndUpdate(user._id, { token: token });
        return res
          .cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 10),
            httpOnly: true,
          })
          .json({
            message: "Account verified",
            succes: "true",
          });
      } else {
        return res.sendStatus(403).json({
          message: "Invalid credentials",
          succes: "false",
        });
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
};
const getUserHandler = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    const verify = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
    if (verify) {
      var decoded = jwt.decode(cookie);
    
      const user = await User.findOne({ email: decoded.email });
      if(!user){
        return res.json({
          message:"no user found",
          succes:"false"
        })
      }
      delete user._doc.password;

      res.json(user._doc);
    } else {
      res.status(401).json({
        message: "unauthorized",
        succes: "false",
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
const updateHandler = async (req, res) => {
  try {
    const data = req.body
    const cookie = req.cookies.token;
    const verify = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
    if (verify) {
      var decoded = jwt.decode(cookie);

      let user = await User.findByIdAndUpdate(decoded.id, data);
      if(!user){
        return res.json({
          message:"error in updating the given fields",
          succes:"false"
        })
      }
      res.send(user);
    } else { 
      res.status(401).json({
        message: "unauthorized",
        succes: "false",
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
const deleteHandler = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    const verify = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
    if (verify) {
      var decoded = jwt.decode(cookie);
      const user = await User.findByIdAndDelete(decoded.id)   
      if(!user){
        return res.json({
          message:"no user found",
          succes:"false"
        })
      }
      res.json({
        message: "account deleted successfully",
        succes: "true",
      })
    } else {
      res.status(401).json({
        message: "unauthorized",
        succes: "false",
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports = { signupHandler, loginHandler, getUserHandler, updateHandler,deleteHandler };
