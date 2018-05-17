const faker = require('faker');

let createDonationSeed = (knex, id) => {
  return knex('donations').insert({
    id,
    title: faker.finance.transactionType(),
    description: faker.lorem.sentence(),
    weight: faker.random.number(),
    createdAt: faker.date.past()
  });
}


exports.seed = function(knex, Promise) {
  return knex('donations').del()
    .then(function () {
      let records = [];
      for (let i = 1; i < 10; i++) {
        records.push(createDonationSeed(knex, i))
      }

      return Promise.all(records);
    });
};
