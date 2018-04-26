const bookshelf = require('../bookshelf');
const User = require('./user');
const Food = require('./food');

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
