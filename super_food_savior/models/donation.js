import bookshelf from '../bookshelf';
import User from './user';
import Food from './food';

const Donation = bookshelf.Model.extend ({
  tableName: 'donations',
  users: function () {
    return this.belongsTo(User);
  },
  foods: function () {
    return this.belongsTo(Food);
  }
})

export default Donation
