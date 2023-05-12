const User = require("../models/userModel");

const searchResults = (req, res) => {
  const searchQuery = req.params.id;
  User.find({
    $or: [
      { first_name: { $regex: new RegExp(searchQuery, "i") } },
      { last_name: { $regex: new RegExp(searchQuery, "i") } },
      { username: { $regex: new RegExp(searchQuery, "i") } },
    ],
  })
    .select(
      "-password -bio -dob -sex -friendList -friendRequests -notifications"
    )
    .then((result) => {
      res.send({ result: result });
    })
    .catch((error) => {
      next(error);
    });
};
/* search bar will be a form that sends post request. this protects sensitive information. 
search route will then send back that search query in which front end will redirect to a dynamic
page with that search query as a url. this triggers a new router which will then send back related 
info from database" */

module.exports = { searchResults };
