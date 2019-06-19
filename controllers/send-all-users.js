const { fetchAllUsers } = require("../models/fetch-all-users");

exports.sendAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(users => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};
