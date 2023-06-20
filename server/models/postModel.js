const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  directedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  likeList: { type: Array, required: true, default: [] },
  picturePath: {
    type: String,
    default: null,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
