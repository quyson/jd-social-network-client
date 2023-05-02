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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect("/");
      } else {
        req.user = user;
        return next();
      }
    })(req, res, next);
  }
}

router.post("/signup", authentication.signup);
router.post("/login", authentication.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ currentUser: req.user, message: "LOl" });
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/",
  })
);

router.get("/success", (req, res) => {
  res.send({ message: req.user });
});

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.get("/logout", isLoggedIn, authentication.logout);

router.get("/profile", isLoggedIn, profile.getUserProfile);

router.get("/check", isLoggedIn, (req, res) => {
  res.send({ user: req.user, message: "HELLO" });
});

router.get("/post:id", isLoggedIn, post.getPost);
router.post("/post/like/:id", isLoggedIn, post.likePost);
router.post("/post/createComment/:id", isLoggedIn, comment.createComment);

module.exports = router;

/* 
route.get homepage ~ takes in the latest posts of all of ur friends and orders it from latest to oldest 
we need to mongo search friends which is derived from user id in req.user, then mongo search posts with each id, then comments for each posts
as the user scrolls down, we search for more. easier said than done probably the hardest paget to code,
route.get page:id dynamic page which will load another user's page and can be found in the search bar, we can have middleware to see if current user is friends with them or not
else we can just send back persons name, bio, profile picture etc..
route.post comment:id/like - same thing as above
route.post createPost - create a new post
route.post createPostFriends - write a post on a friends wall
route.post post:id/comment - create a new comment

AFTER WE FINISH BASIC STUFF WE CAN FOCUS ON ADDING PICTURYES/ JOINING CROUPS/ DIFFERENT LIKES
*/
