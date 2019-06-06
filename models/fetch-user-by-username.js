const connection = require("../db/connection");

exports.fetchUserById = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where({ username });
};
