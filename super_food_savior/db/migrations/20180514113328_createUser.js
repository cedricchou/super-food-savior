exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.text("address");
    table
      .string("email")
      .unique()
      .notNull();
    table.string("password").notNull();
    table.string("latitude");
    table.string("longitude");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
