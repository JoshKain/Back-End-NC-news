const { insertNewComment } = require("../models/insert-new-comment");

exports.addNewComment = (req, res, next) => {
  const comment = req.body;
  //   req.params?
  insertNewComment(comment)
    .then(newComment => {
      if (newComment[0].author === null || newComment[0].body === null) {
        return Promise.reject({
          status: 400,
          msg: "Incorrect properties does not exist on comments"
        });
      }
      res.status(201).send({ newComment });
    })
    .catch(next);
};
