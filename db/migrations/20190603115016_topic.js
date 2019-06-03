exports.up = function(knex, Promise) {
  console.log("creating topic table .... ");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.unique("slug").primary();
    topicsTable.string("description");
  });
};

exports.down = function(knex, Promise) {
  console.log("droping topic table...");
  return knex.schema.dropTable("topics");
};
