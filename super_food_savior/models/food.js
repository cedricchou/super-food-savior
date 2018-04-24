import bookshelf from '../bookshelf';

const Food = bookshelf.Model.extends ({
  tableName: 'foods',
})

export default Food;
