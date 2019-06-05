const connection = require("../db/connection");
const { formatBelongToKey } = require("../utils/format-comments");

exports.insertNewComment = ({ username, body }) => {
  return connection
    .insert({ author: username, body })
    .into("comments")
    .returning("*");
};
