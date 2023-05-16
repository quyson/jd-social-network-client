const User = require("../models/userModel");

const getNotifications = (req, res, next) => {
  User.findById(req.user.id)
    .then((result) => {
      result.notifications.push("yo");
      result.notifications.push("yo");
      result.notifications.push("lmao");
      if (result.notifications.length > 15) {
        result.notifications.pop();
      }
      const uniqueArr = [
        ...new Set(result.notifications.map((obj) => JSON.stringify(obj))),
      ].map((str) => JSON.parse(str));
      res.send({
        success: true,
        notifications: uniqueArr,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getNotifications };
