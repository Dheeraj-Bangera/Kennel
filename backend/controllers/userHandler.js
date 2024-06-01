const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator =require("otp-generator")
require("dotenv").config(); 
const sendOtpHandler = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({
        message: "user already exists",
        success: false,
      });
    }
    const otp = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const createOtp = await OTP.create({
      email: email,
      otp: otp,
    });
    if (createOtp) {
      return res.json({
        otp: otp,
        success: true,
      });
    } else console.log("error sending otp");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal server error");
  }
};
const signupHandler = async (req, res) => {
  try {
    const { name, email, password: plainPassword, phoneNumber, otp } = req.body;

    // Validate required fields
    if (!name || !email || !plainPassword || !phoneNumber || !otp) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    // Check if user with the given phone number already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    // Check if OTP is valid
    const validOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!validOtp) {
      return res.status(400).json({
        message: "No OTP found",
        success: false,
      });
    } else if (otp !== validOtp.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    if (!newUser) {
      return res.status(500).json({
        message: "Account creation failed",
        success: false,
      });
    }

    // Delete OTP after successful user creation
    await OTP.deleteMany({ email });

    // Create JWT token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    // Send response
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        secure: true,
        overwrite: true,
        sameSite: "none"
      })
      .json({
        message: "Account created successfully",
        success: true,
        user: {
          id: newUser._id,
          name,
          email,
          phoneNumber,
        },
        token,
      });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("Internal server error");
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
          expiresIn: "10h",
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
            user:{
              name: user.name,
              email:user.email,
              token:token
            },
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
    const id = req.body.userData.id;
    if (!id) {
      res.status(401).json({
        message: "unauthorized",
        succes: "false",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.json({
        message: "no user found",
        succes: "false",
      });
    }
    delete user._doc.password;
    delete user._doc.post
    delete user._doc.token
    delete user._doc.comments
    delete user._doc.adopted_animal
    

    res.json(user._doc);
  } catch (err) {
    console.log("Error", err);
  }
};
const updateHandler = async (req, res) => {
  try {
    const userId = req.body.userData.id; // Assuming the authenticated user's ID is in req.body.userData.id
    const { name, password, email, phoneNumber, address, city, pincode } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Update user fields
    if (name) user.name = name;
    if (password) user.password = password;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (city) user.city = city;
    if (pincode) user.pincode = pincode;

    // Save updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred", success: false });
  }
};
//
const deleteHandler = async (req, res) => {
  try {
    const id = req.body.userData.id

    if (id) {
      
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.json({
          message: "no user found",
          succes: "false",
        });
      }
      res.json({
        message: "account deleted successfully",
        succes: "true",
      });
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
module.exports = {
  signupHandler,
  loginHandler,
  getUserHandler,
  updateHandler,
  deleteHandler,
  sendOtpHandler
};
