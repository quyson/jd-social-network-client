const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const authentication = require("../controllers/authentication");
const passport = require("passport");
const profile = require("../controllers/profile");
const post = require("../controllers/post");
const comment = require("../controllers/comment");
const search = require("../controllers/search");
const request = require("../controllers/request");

/* timeline router is gonna make a call for latest posts in user friend list, check if directed to is same as 
user then that would count as a post, whereas different direct and user would have the write on a wall display*/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log("Can't find User");
        return next(err);
      } else {
        req.user = user;
        return next();
      }
    })(req, res, next);
  }
}

router.get("timeline", isLoggedIn, post.timeline);
router.post("/signup", authentication.signup);
router.post("/login", authentication.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ user: req.user, message: "LOl" });
  }
);

/*router.post("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/",
    successRedirect: "http://localhost:3000/check",
  })
);*/

router.get("/success", (req, res) => {
  res.send({ message: req.user });
});

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/logout", isLoggedIn, authentication.logout);

router.get("/profile", isLoggedIn, profile.getUserProfile);

router.get("/check", isLoggedIn, (req, res) => {
  res.send({ user: req.user, message: "HELLO" });
});

router.post("/search", isLoggedIn, search.search);
router.get("/search/:query", isLoggedIn, search.searchResults);
router.get("/page/:id", isLoggedIn, profile.getOthersPage);
router.patch("/page/request/:id", isLoggedIn, request.sendFriendRequest);
router.get("/post:id", isLoggedIn, post.getPost);
router.post("/post/like/:id", isLoggedIn, post.likePost);
router.post("/post/createComment/:id", isLoggedIn, comment.createComment);
router.post("/comment/like/:id", isLoggedIn, comment.likeComment);
router.delete("/request/delete/:id", isLoggedIn, request.deleteFriendRequest);
router.patch("/request/accept/:id/");
router.post("/createPost", isLoggedIn, post.createPost);
router.post("page/createPost/:id", isLoggedIn, post.createPostFriends);

module.exports = router;

/* 
AFTER WE FINISH BASIC STUFF WE CAN FOCUS ON ADDING PICTURYES/ JOINING CROUPS/ DIFFERENT LIKES
*/
