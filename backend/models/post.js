const mongoose = require("mongoose");
require("dotenv").config();
const postSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true,
  },
  animal_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: [
   { type: String}
  ],
  description: {
    type: String,
  },
  breed: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adopted_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
  ],
  tags: [{ type: String }],
  date: {
    type: Date,
  },
});
module.exports = mongoose.model("post", postSchema);
