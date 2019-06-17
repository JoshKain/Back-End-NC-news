const { insertNewTopic } = require("../models/insert-new-topic");

exports.addTopic = (req, res, next) => {
  const topic = req.body;
  insertNewTopic(topic)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
