const { fetchCommentToBeDeleted } = require("../models/fetch-deleted-comment");

exports.deleteCommentByComment_id = (req, res, next) => {
  fetchCommentToBeDeleted(req.params)
    .then(body => {
      if (!body[0]) {
        return Promise.reject({ status: 404, msg: "No such comment_id" });
      } else
        res.status(204).send({
          msg: `comment_id ${req.params} has been successfully deleted`
        });
    })
    .catch(next);
};
