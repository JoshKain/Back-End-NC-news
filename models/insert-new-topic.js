const connection = require("../db/connection");

exports.insertNewTopic = topic => {
  return connection
    .insert(topic)
    .into("topics")
    .returning("*");
};
