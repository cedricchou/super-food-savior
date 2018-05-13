const bookshelf = require("../bookshelf");
const User = require("./user");
const Food = require("./food");
const Answer = require("./answer");
const Message = require("./message");

const Donation = bookshelf.Model.extend({
  tableName: "donations",
  users: function() {
    return this.belongsTo(User);
  },
  foods: function() {
    return this.belongsTo(Food);
  },
  messages: function() {
    return this.hasMany(Message);
  },
  answers: function() {
    return this.hasMany(Answer);
  }
});

exports.Donation = Donation;
