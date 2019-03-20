const bookshelf = require("../bookshelf");
const Donation = require("./donation");
const Answer = require("./answer");
const User = require("./user");

const Message = bookshelf.Model.extend({
  tableName: "answers",
  donations: function() {
    return this.belongsTo(Donation);
  },
  users: function() {
    return this.belongsTo(User);
  },
  answers: function() {
    return this.hasMany(Answer);
  }
});

exports.Message = Message;
