import bookshelf from '../bookshelf';
import Donation from './donation';

const User = bookshelf.Model.extend ({
  tableName: 'users',
  donations: function () {
    return this.hasMany(Donation)
  };
})

export default User;
