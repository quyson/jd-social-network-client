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

const likeComment = async (req, res) => {
  try {
    const commentResult = await Comment.findById(req.params.id).populate(
      "user"
    );

    if (commentResult.likeList.includes(req.user.id)) {
      console.log("Already Liked");
      return;
    }

    const notifications = {
      from: req.user.id,
      name: req.user.first_name + " " + req.user.last_name,
      status: "likeComment",
    };

    if (commentResult.user.id != req.user.id) {
      const userResult = await User.findByIdAndUpdate(commentResult.user.id, {
        $push: { notifications: notifications },
      });
    }

    const newLikes = commentResult.likes + 1;
    commentResult.likeList.push(req.user.id);
    commentResult.likes = newLikes;
    const save = await commentResult.save();
    if (save) {
      res.send({
        success: true,
        message: "Successfully liked",
        newLikes: postResult.likes,
      });
    }
  } catch {
    console.log(error);
  }
};

module.exports = { createComment, likeComment };
