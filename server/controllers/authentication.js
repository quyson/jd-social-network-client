const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

module.exports = { signup };
