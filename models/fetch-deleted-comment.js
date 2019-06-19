const connection = require("../db/connection");

exports.fetchCommentToBeDeleted = ({ comment_id }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .del("*")
    .returning("*");
};
