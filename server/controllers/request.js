const User = require("../models/userModel");

const sendFriendRequest = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { friendRequests: req.user.id } },
    { new: true }
  ).then((result) => {
    res.send({
      success: true,
      message: "Successfully sent a Friend Request",
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
};
