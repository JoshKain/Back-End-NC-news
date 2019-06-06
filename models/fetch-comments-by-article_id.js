const connection = require("../db/connection");

exports.fetchCommentsByArticle_id = ({ article_id }, { sort_by, order }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", "=", article_id.article_id)
    .orderBy(sort_by || "created_at", order || "desc");
};
