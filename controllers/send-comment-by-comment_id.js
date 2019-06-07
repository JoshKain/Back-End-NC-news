const {
  fetchCommentByComment_id
} = require("../models/fetch-comment-by-comment_id");

exports.sendCommentByComment_id = (req, res, next) => {
  let comment_id = req.params;
  let num = req.body;
  fetchCommentByComment_id({ comment_id, num })
    .then(([comment]) => {
      if (!comment) {
        next({ status: 404, msg: "Route Not Found" });
      } else if (!num.inc_Votes) {
        next({ status: 400, msg: "Bad Request" });
      } else res.status(200).send({ comment });
    })
    .catch(next);
};
