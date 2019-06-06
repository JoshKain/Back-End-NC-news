const { fetchDeletedComment } = require("../models/fetch-deleted-comment");

exports.deleteCommentByComment_id = (req, res, next) => {
  fetchDeletedComment(req.params)
    .then(body => {
      if (!body[0]) {
        next({ status: 404, msg: "No such comment_id" });
      } else
        res.status(204).send({
          msg: `comment_id ${req.params} has been sucessfully deleted`
        });
    })
    .catch(next);
};
