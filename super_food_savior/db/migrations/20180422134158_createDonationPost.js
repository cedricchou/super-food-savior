
exports.up = function(knex, Promise) {
  return knex.schema.createTable('donations', (table) => {
    table.increments('id');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.string('title').notNull();
    table.text('description').notNull();
    table.float('weight');
    table.text('pictureUrl');
    table.integer('user_id').references('users.id');
    table.integer('food_id').references('foods.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('donations');
};
