const User = require("../models/userModel");

const getNotifications = (req, res, next) => {
  User.findById(req.user.id)
    .then((result) => {
      result.notifications.push("yo");
      res.send({
        success: true,
        notifications: result.notifications,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getNotifications };
