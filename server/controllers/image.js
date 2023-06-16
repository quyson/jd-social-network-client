const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { Image, ProfileImage } = require("../models/imageModel");

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

const uploadProfile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename, path } = req.file;

  const newProfileImage = new ProfileImage({
    user: req.user._id,
    filename: filename,
    path: path,
  });

  newProfileImage
    .save()
    .then((result) =>
      res.send({
        success: true,
        message: "Successfully uploaded Profile Picture",
      })
    )
    .catch((error) => console.log(error));
};

const getProfileImage = (req, res) => {
  ProfileImage.find({ user: req.user._id })
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

module.exports = { getImage, uploadImage, uploadProfile, getProfileImage };
