const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const cloudinaryConnect = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
    console.log("cloudinary connected!");
  } catch (err) {
    console.log(err);  
  }
};
module.exports = cloudinaryConnect;
