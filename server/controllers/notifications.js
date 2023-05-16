const User = require("../models/userModel");

const getNotifications = (req, res, next) => {
  User.findById(req.user.id, ["notifications"])
    .then((result) => {
      res.send({
        success: true,
        notifications: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getNotifications };
