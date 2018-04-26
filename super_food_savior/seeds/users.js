const faker = require('faker');

let createUserSeed = (knex, id) => {
  return knex('users').insert({
    id,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.exampleEmail(),
    address: faker.address.streetAddress()
  });
}


exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      let records = [];
      for (let i = 1; i < 10; i++) {
        records.push(createUserSeed(knex, i))
      }

      return Promise.all(records);
    });
};
