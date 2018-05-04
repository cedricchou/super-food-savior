
exports.up = function(knex, Promise) {
  return knex.schema.createTable('preferences', table => {
    table.increments();
    table.integer('tag_id').references('tags.id');
    table.integer('user_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preferences');
};
