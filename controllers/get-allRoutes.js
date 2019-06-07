const { api } = require("../endpoints.json");

exports.allRoutes = (req, res, next) => {
  res.status(200).send({ api });
};
