module.exports = {
  development: {
    client: "pg",
    connection: {
      database: 'super_food_savior_dev'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  },
};
