const connection = require("../db/connection");

exports.fetchCommentByComment_id = ({ comment_id, num }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id.comment_id)
    .modify(query => {
      if (num.inc_Votes) query.increment("votes", num.inc_Votes).returning("*");
    });
};
