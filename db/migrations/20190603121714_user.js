exports.up = function(knex, Promise) {
  console.log("creating user table .... ");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function(knex, Promise) {
  console.log("droping user table...");
  return knex.schema.dropTable("users");
};
