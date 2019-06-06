const { fetchDeletedComment } = require("../models/fetch-deleted-comment");

exports.deleteCommentByComment_id = (req, res, next) => {
  fetchDeletedComment(req.params)
    .then(body => {
      res
        .status(204)
        .send({ msg: `comment_id ${req.params} has been sucessfully deleted` });
    })
    .catch(next);
};
