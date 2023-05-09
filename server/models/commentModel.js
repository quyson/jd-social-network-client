const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  likeList: { type: Array, required: true, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
