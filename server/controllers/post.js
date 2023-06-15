const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const timeline = async (req, res) => {
  try {
    const userResult = await User.findById(req.user.id);
    const userFriendList = userResult.friendList;
    const [friends, friendPosts] = await Promise.all([
      User.find(
        {
          _id: { $in: userFriendList },
        },
        "username first_name last_name"
      ),
      Post.find({
        directedTo: { $in: userFriendList.concat(req.user.id) },
      })
        .populate("user")
        .sort("-timestamp")
        .limit(25),
    ]);

    const friendPostIds = friendPosts.map((post) => post._id);

    const comments = await Comment.find({
      post: { $in: friendPostIds },
    }).populate({
      path: "user",
      select: "first_name last_name username createdAt",
    });

    const postsWithComments = friendPosts.map((post) => {
      const postComments = comments.filter((comment) =>
        comment.post.equals(post._id)
      );
      return { ...post.toObject(), comments: postComments };
    });

    res.send({ friendPosts: postsWithComments, friends: friends });
  } catch (error) {
    next(error);
  }
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
      post: result.id,
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

const likePost = async (req, res) => {
  try {
    const postResult = await Post.findById(req.params.id).populate("user");

    if (postResult.likeList.includes(req.user.id)) {
      console.log("Already Liked");
      return;
    }

    const notifications = {
      from: req.user.id,
      name: req.user.first_name + " " + req.user.last_name,
      status: "likePost",
    };

    if (postResult.user.id != req.user.id) {
      const userResult = await User.findByIdAndUpdate(postResult.user.id, {
        $push: { notifications: notifications },
      });
    }

    const newLikes = postResult.likes + 1;
    postResult.likeList.push(req.user.id);
    postResult.likes = newLikes;
    const save = await postResult.save();
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

module.exports = { getPost, likePost, createPost, createPostFriends, timeline };
