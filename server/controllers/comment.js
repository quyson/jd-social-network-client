const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const createComment = (req, res) => {
  const newComment = new Comment({
    message: req.body.message,
    likes: 0,
    likeList: [],
    user: req.user.id,
    post: req.params.id,
  });
  newComment
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "Created comment successfully",
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { createComment };
