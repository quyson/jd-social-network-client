const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const timeline = async (req, res) => {
  const userFriendList = await User.findById(req.user.id, "friendList");
  const friendIds = userFriendList.map((element) => element.id);
  const friendPosts = await Post({ _id: { $in: friendIds } })
    .sort("-timestamp")
    .limit(25);
  res.send({ friendPosts: friendPosts });
};

const getPost = async (req, res) => {
  try {
    const [post, comments] = await Promise.all([
      Post.findById(req.params.id).populate("user"),
      Comment.find({ post: req.params.id }).populate("user"),
    ]);
    res.send({
      post: post,
      comments: comments,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res) => {
  const newPost = new Post({
    message: req.body.message,
    likes: 0,
    directedTo: req.user.id,
    user: req.user.id,
    likeList: [],
  });
  try {
    const result = await newPost.save();
    res.send({
      success: true,
      message: "Created post sucessfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createPostFriends = async (req, res) => {
  try {
    const newPost = new Post({
      message: req.body.message,
      likes: 0,
      directedTo: req.params.id,
      user: req.user.id,
      likeList: [],
    });
    const result = await newPost.save();
    const notifications = {
      from: req.user.id,
      name: req.user.first_name + req.user.last_name,
      status: "newPost",
    };
    const resultFriend = await User.findByIdAndUpdate(req.params.id, {
      $push: { notifications: notifications },
    });
    res.send({
      success: true,
      message: "Created post sucessfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const likePost = (req, res) => {
  Post.findById(req.params.id)
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

module.exports = { getPost, likePost, createPost, createPostFriends, timeline };
