// import bookshelf from '../bookshelf';
const bookshelf = require('../bookshelf');

const Food = bookshelf.Model.extend ({
  tableName: 'foods',
})

// export default Food;
exports.Food = Food;
