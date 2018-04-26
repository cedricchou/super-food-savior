// import Bookshelf from '../bookshelf';
const bookshelf = require('../bookshelf');
const User = require('./user');
const Food = require('./food');
// import User from './user';
// import Food from './food';

const Donation = bookshelf.Model.extend ({
  tableName: 'donations',
  users: function () {
    return this.belongsTo(User);
  },
  foods: function () {
    return this.belongsTo(Food);
  }
})

exports.Donation = Donation;

// export default Donation;
