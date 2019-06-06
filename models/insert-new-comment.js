const connection = require("../db/connection");
const { formatBelongToKey } = require("../utils/format-comments");

exports.insertNewComment = ({ username, body }, { article_id }) => {
  return connection
    .insert({ author: username, body, article_id: article_id })
    .into("comments")
    .returning("*");
};
