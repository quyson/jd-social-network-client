const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  data: Buffer,
  filename: String,
  contentType: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
