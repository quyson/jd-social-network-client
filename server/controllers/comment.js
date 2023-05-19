const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  try {
    const newComment = new Comment({
      message: req.body.message,
      likes: 0,
      likeList: [],
      user: req.user.id,
      post: req.params.id,
    });
    const postResult = await Post.findById(req.params.id).populate("user");
    if (postResult.user.id !== req.user.id) {
      const notifications = {
        from: req.user.id,
        name: req.user.first_name + " " + req.user.last_name,
        reference: postResult.id,
        status: "newComment",
      };
      const saveResult = newComment.save();
      const friendResult = await User.findByIdAndUpdate(postResult.user.id, {
        $push: { notifications: notifications },
      });
    }
    const saveResult = newComment.save();
    res.send({
      success: true,
      message: "Successfully commented on friend's post!",
    });
  } catch {
    console.log(error);
  }
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
