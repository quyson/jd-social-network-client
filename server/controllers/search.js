const User = require("../models/userModel");

const search = (req, res) => {
  const searchQuery = req.body.searchQuery;
  res.send({ searchURL: `/search?q=${searchQuery}` });
};

const searchResults = (req, res) => {
  const searchQuery = req.query.q;
  User.find(
    {
      $or: [
        { username: searchQuery },
        { first_name: searchQuery },
        { last_name: searchQuery },
      ],
    },
    ["first_name", "last_name", "username"]
  )
    .then((result) => {
      res.send({ searchResults: result });
    })
    .catch((error) => {
      return next(error);
    });
};

/* search bar will be a form that sends post request. this protects sensitive information. 
search route will then send back that search query in which front end will redirect to a dynamic
page with that search query as a url. this triggers a new router which will then send back related 
info from database" */

module.exports = { search, searchResults };
