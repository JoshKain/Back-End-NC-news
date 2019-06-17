const { insertNewUser } = require("../models/insert-new-user");

exports.addUser = (req, res, next) => {
  const user = req.body;
  insertNewUser(user)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
