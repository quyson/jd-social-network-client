const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Image = require("../models/imageModel");
const upload = require("../config/upload");

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename, path } = req.file;
  const postId = req.body.postId;

  const newImage = new Image({
    post: postId,
    filename: filename,
    path: path,
  });

  newImage
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "Photo successfully uploaded",
      });
    })
    .catch((error) => console.log(error));
};

const getImage = (req, res) => {
  const postId = req.params.id;
  Image.find({ post: postId })
    .then((result) => {
      const imagePath = `${result.path}`;
      res.send({
        success: true,
        message: "Successfully sent image!",
        imagePath: imagePath,
      });
    })
    .catch((error) => console.log(error));
};
