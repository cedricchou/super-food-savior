const bookshelf = require('../bookshelf');

const Food = bookshelf.Model.extend ({
  tableName: 'foods',
})

exports.Food = Food;
