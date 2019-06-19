const connection = require("../db/connection");

exports.fetchAllUsers = () => {
  return connection.select("*").from("users");
};
