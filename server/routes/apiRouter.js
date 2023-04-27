const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

router.post("/signup", (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  newUser
    .save()
    .then((result) =>
      res.send({
        success: true,
        message: "User saved successfully",
      })
    )
    .catch((err) => {
      console.log(err);
      res.send({
        success: false,
        message: "User save has failed",
      });
    });
});

router.post("/posts", (req, res) => {
  const newPost = new Post(req.body);
  newPost.save().then((result) => res.send("GOOD POST"));
});

router.post("/comments", (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save().then((result) => res.send("GOOD COMMMENT"));
});
module.exports = router;
