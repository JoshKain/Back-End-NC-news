const connection = require("../db/connection");

exports.insertNewUser = user => {
  return connection
    .insert(user)
    .into("users")
    .returning("*");
};
