// import bookshelf from '../bookshelf';
const bookshelf = require('../bookshelf');
// import Donation from './donation';
const Donation = require('./donation')

const User = bookshelf.Model.extend ({
  tableName: 'users',
  donations: function () {
    return this.hasMany(Donation)
  }
})

// export default User;
exports.User = User;
