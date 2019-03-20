const bookshelf = require("../bookshelf");
const User = require("./user");
const Answer = require("./answer");
const Message = require("./message");

const Donation = bookshelf.Model.extend({
  tableName: "donations",
  users: function() {
    return this.belongsTo(User);
  },
  messages: function() {
    return this.hasMany(Message);
  },
  answers: function() {
    return this.hasMany(Answer);
  }
});

exports.Donation = Donation;
