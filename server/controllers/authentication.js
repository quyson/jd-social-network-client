const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

const secretOrKey = process.env.secretOrKey;

const signup = (req, res, next) => {
  User.find({ username: req.body.username }).then((result) => {
    if (result.length > 0) {
      const err = new Error("Username is already taken!");
      err.status = 403;
      next(err);
    } else {
      const newUser = new User(req.body);
      bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        newUser.password = hashedPassword;
        newUser
          .save()
          .then((result) =>
            res.send({
              success: true,
              message: "User has been created!",
            })
          )
          .catch((err) => {
            next(err);
          });
      });
    }
  });
};

const login = (req, res) => {
  User.findOne({ username: req.body.username }).then((result) => {
    if (!result) {
      res.status(401).send({
        success: false,
        message: "Cannot find User!",
      });
    }
    bcrypt.compare(req.body.password, result.password, (err, match) => {
      if (match) {
        const payload = { id: result.id };
        const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });
        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          token: "Bearer " + token,
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Incorrect Password",
        });
      }
    });
  });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send({ logout: true });
  });
};

module.exports = { signup, login, logout };
