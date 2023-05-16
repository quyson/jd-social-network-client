const User = require("../models/userModel");

const sendFriendRequest = (req, res) => {
  const notification = { from: req.user.id, status: req.body.status };
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { friendRequests: req.user.id, notifications: notification } },
    { new: true }
  ).then((result) => {
    res.send({
      success: true,
      message: "Successfully sent a Friend Request",
    });
  });
};

const cancelFriendRequest = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        friendRequests: req.user.id,
        notifications: { from: req.user.id, status: "friendRequest" },
      },
    },
    { new: true }
  ).then((result) => {
    res.send({
      success: true,
      message: "Successfully Cancelled Friend Request",
    });
  });
};

const deleteFriendRequest = (req, res) => {
  User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { friendRequests: req.params.id },
    },
    { new: true }
  )
    .then((result) => {
      res.send({
        success: true,
        message: "Deleted Request",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const acceptFriendRequest = async (req, res) => {
  try {
    const [addToFriends, deleteOffRequest] = await Promise.all([
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { friendList: req.params.id } },
        { new: true }
      ),
      User.findByIdAndDelete(
        req.user.id,
        { $pull: { friendRequests: req.params.id } },
        { new: true }
      ),
    ]);
    res.send({
      success: true,
      message: "Successfully Added Friend!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
};
