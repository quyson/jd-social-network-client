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

const likeComment = (req, res) => {
  Comment.findById(req.params.id)
    .then((result) => {
      if (result.likeList.includes(req.user.id)) {
        return;
      }
      const updatedLikes = result.likes + 1;
      result.likeList.push(req.user.id);
      result.likes = updatedLikes;
      result
        .save()
        .then((result) => {
          res.send({
            success: true,
            likes: result.likes,
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { createComment, likeComment };
