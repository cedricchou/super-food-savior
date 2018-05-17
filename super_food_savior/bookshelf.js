const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'super_food_savior_dev',
    charset  : 'utf8'
  }
});

module.exports = require('bookshelf')(knex);
