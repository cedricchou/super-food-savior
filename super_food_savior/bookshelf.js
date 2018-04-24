const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mybooks',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

export default bookshelf;
