const bookshelf = require('../bookshelf');
const Donation = require('./donation')

const User = bookshelf.Model.extend ({
  tableName: 'users',
  donations: function () {
    return this.hasMany(Donation)
  }
})

exports.User = User;
