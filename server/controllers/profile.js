const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const getUserProfile = async (req, res) => {
  try {
    const [user, posts] = await Promise.all([
      User.findById(req.user.id, [
        "username",
        "first_name",
        "last_name",
        "bio",
        "dob",
        "private",
        "friendList",
      ]),
      Post.find({ directedTo: req.user.id }).populate({
        path: "user",
        select: "first_name last_name username",
      }),
    ]);

    const postIds = posts.map((post) => post._id);

    const comments = await Comment.find({ post: { $in: postIds } }).populate({
      path: "user",
      select: "first_name last_name username createdAt",
    });

    const postsWithComments = posts.map((post) => {
      const postComments = comments.filter((comment) =>
        comment.post.equals(post._id)
      );
      return { ...post.toObject(), comments: postComments };
    });

    res.send({
      success: true,
      resultUser: user,
      resultPost: postsWithComments,
    });
  } catch (error) {
    next(error);
  }
};

const getOthersPage = async (req, res) => {
  try {
    const [user, posts] = await Promise.all([
      User.findById(req.params.id, [
        "username",
        "first_name",
        "last_name",
        "bio",
        "dob",
        "private",
        "friendList",
        "friendRequests",
      ]),
      Post.find({ directedTo: req.params.id }).populate({
        path: "user",
        select: "first_name last_name username",
      }),
    ]);
    if (user.id === req.user.id) {
      res.send({
        success: true,
        sameUser: true,
      });
    }
    if (user.friendList.includes(req.user.id) || user.private == false) {
      const postIds = posts.map((post) => post._id);

      const comments = await Comment.find({ post: { $in: postIds } }).populate({
        path: "user",
        select: "first_name last_name username createdAt",
      });

      const postsWithComments = posts.map((post) => {
        const postComments = comments.filter((comment) =>
          comment.post.equals(post._id)
        );
        return { ...post.toObject(), comments: postComments };
      });
      res.send({
        success: true,
        resultUser: user,
        resultPost: postsWithComments,
        access: true,
      });
    } else {
      let friendRequestSent = false;
      if (user.friendRequests.includes(req.user.id)) {
        friendRequestSent = true;
      }
      res.send({
        success: true,
        access: false,
        friendRequestSent: friendRequestSent,
        resultUser: {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          bio: user.bio,
        },
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserProfile,
  getOthersPage,
};
