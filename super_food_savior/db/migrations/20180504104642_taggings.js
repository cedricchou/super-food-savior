
exports.up = function(knex, Promise) {
  return knex.schema.createTable('taggings', table => {
    table.increments();
    table.integer('tag_id').references('tags.id');
    table.integer('donation_id').references('donations.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('taggings');
};
