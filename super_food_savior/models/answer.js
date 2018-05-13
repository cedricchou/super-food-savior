const bookshelf = require("../bookshelf");
const Donation = require("./donation");
const Message = require("./message");
const User = require("./user");

const Answer = bookshelf.Model.extend({
  tableName: "answers",
  messages: function() {
    return this.belongsTo(Message);
  },
  donations: function() {
    return this.belongsTo(Donation);
  },
  users: function() {
    return this.belongsTo(User);
  }
});

exports.Answer = Answer;
