const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const authentication = require("../controllers/authentication");
const passport = require("passport");

router.post("/signup", authentication.signup);
router.post("/login", authentication.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ currentUser: req.user });
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

router.get("/success", (req, res) => {
  res.send({ message: req.user });
});

router.get("/fail", (req, res) => {
  res.send({ message: "You are NOT in through Facebook" });
});

router.get(
  "/check",
  passport.authenticate("facebook", { session: false }, (req, res) => {
    res.send({ message: "fuck u" });
  })
);

module.exports = router;
