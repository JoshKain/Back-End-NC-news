const { fetchUserById } = require("../models/fetch-user-by-username");

exports.sendUserByUsername = (req, res, next) => {
  let username = req.params;
  fetchUserById(username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `Invalid Route for ${username.username} request`
        });
      } else res.status(200).send({ user });
    })
    .catch(next);
};
