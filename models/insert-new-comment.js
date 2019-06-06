const connection = require("../db/connection");

exports.insertNewComment = ({ username, body }, { article_id }) => {
  return connection
    .insert({ author: username, body, article_id: article_id })
    .into("comments")
    .returning("*");
};
