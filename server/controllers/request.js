const User = require("../models/userModel");

const sendFriendRequest = (req, res) => {
  const notification = {
    from: req.user.id,
    name: req.user.first_name + " " + req.user.last_name,
    status: req.body.status,
  };
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
        notifications: {
          from: req.user.id,
          name: req.user.first_name + " " + req.user.last_name,
          status: "friendRequest",
        },
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
      $pull: {
        friendRequests: req.params.id,
        notifications: {
          from: req.params.id,
          name: req.params.first_name + " " + req.params.last_name,
          status: "friendRequest",
        },
      },
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
    const result = await User.findByIdAndUpdate(req.params.id, {
      $push: {
        notifications: {
          from: req.user.id,
          name: req.user.first_name + " " + req.user.last_name,
          status: "AcceptRequest",
        },
        friendList: req.user.id,
      },
    });
    const paramsFirstName = result.first_name;
    const paramsLastName = result.last_name;
    const result2 = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { friendList: req.params.id } },
      { new: true }
    );
    const result3 = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          friendRequests: req.params.id,
          notifications: {
            from: req.params.id,
            name: paramsFirstName + " " + paramsLastName,
            status: "friendRequest",
          },
        },
      },
      { new: true }
    );
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
