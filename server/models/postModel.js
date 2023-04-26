const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  likeLIst: { type: Array, required: true, default: [] },
  picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
