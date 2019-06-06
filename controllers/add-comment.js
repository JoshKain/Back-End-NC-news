const { insertNewComment } = require("../models/insert-new-comment");

exports.addNewComment = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  insertNewComment(comment, { article_id })
    .then(newComment => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};
