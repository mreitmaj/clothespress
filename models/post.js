const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image_url: { type: String, required: true },
  cloudinary_id: String,
  feelings: { type: String, required: true },
  occasion: { type: String, required: true},
  brand: { type: String, required: true },
  colour: { 
    red: Number,
    green: Number,
    blue: Number,
   },
   posted_by: { type: Schema.Types.ObjectId, ref: "User" }

  // colours from cloud vision API
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;