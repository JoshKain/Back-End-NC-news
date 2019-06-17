const { fetchAllUsers } = require("../models/fetch-all-users");

exports.sendAllUsers = (req, res, next) => {
  fetchAllUsers(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
