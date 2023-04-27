const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

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

router.get("/signup", (req, res) => {
  const newUser = new User({
    first_name: "Taro",
  });
  newUser.save().then((result) => console.log("lol"));
});

module.exports = router;
